import {
  ExplorerTreeNode,
  HTTPMethods,
} from "@/components/sidebar/explorer/explorerTree";
import useExplorerStore from "@/stores/explorerStore";
import { Explorer } from "@/utils/Explorer";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";
import useHistoryManager from "./useHistoryManager";
import { HistoryNode } from "@/utils/types";
import useExplorerCreateMutation from "../mutation/explorer/useExplorerCreateMutation";
import useExplorerUpdateMutation from "../mutation/explorer/useExplorerUpdateMutation";
import useRequestMutation from "../mutation/workspace/useRequestMutation";
import useExplorerDeleteMutation from "../mutation/explorer/useExplorerDeleteMutation";
import useWorkspaceStore from "@/stores/workspaceStore";

export default function useExplorerManager() {
  const queryClient = useQueryClient();
  const { pushHistory, history, setHistory } = useHistoryManager();
  const store = useExplorerStore();
  const { workspaceId } = useWorkspaceStore();
  const { updateWorkspaceOptimistically } = useExplorerUpdateMutation();
  const { deleteExplorerNodeOptimistically } = useExplorerDeleteMutation();
  const { updateRequestOptimistically } = useRequestMutation();
  const { createExplorerNodeOptimistically } = useExplorerCreateMutation();

  const getData = () => {
    return queryClient.getQueryData<Workspace>([
      QUERY_KEYS.WORKSPACE,
      workspaceId,
    ]);
  };

  // Internal usage only : changes node focus
  const _changeFocus = (
    newExplorer: ExplorerTreeNode[],
    targetNode: HistoryNode
  ) => {
    store.setSelectedNode(targetNode);
    store.setCwd(Explorer.getNodePath(newExplorer, targetNode.id));
    pushHistory(targetNode);
  };

  const search = (query: string) => {
    if (query === "") {
      store.setWorkspaceSearchResults(undefined);
      return;
    }

    const workspace = getData();
    if (!workspace) return;
    const res = Explorer.findMany(workspace.explorer, query);
    store.setWorkspaceSearchResults(res);
  };

  const insertRequest = (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "request",
      httpMethod: "GET",
      id: v4(),
      title: "New Request",
    };
    createExplorerNodeOptimistically((current) => {
      const newExplorer = Explorer.insertNode(
        current.explorer,
        targetId,
        newNode
      );
      _changeFocus(newExplorer, newNode);

      return {
        ...current,
        explorer: newExplorer,
      };
    }, newNode);
  };

  const insertCollection = () => {
    const newNode: ExplorerTreeNode = {
      type: "collection",
      id: v4(),
      isOpen: true,
      title: "New Collection",
      children: [],
    };

    createExplorerNodeOptimistically((current) => {
      const newExplorer = [...structuredClone(current.explorer), newNode];
      _changeFocus(newExplorer, newNode);
      return {
        ...current,
        explorer: newExplorer,
      };
    }, newNode);
  };

  const insertGroup = (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "group",
      id: v4(),
      isOpen: true,
      title: "New Group",
      children: [],
    };
    createExplorerNodeOptimistically((current) => {
      const newExplorer = Explorer.insertNode(
        current.explorer,
        targetId,
        newNode
      );
      _changeFocus(newExplorer, newNode);

      return {
        ...current,
        explorer: newExplorer,
      };
    }, newNode);
  };

  const deleteNode = (targetId: string) => {
    const data = getData();
    if (!data) return;
    const newExplorer = Explorer.popNode(data.explorer, targetId);
    const nodeDeleteCandidate = Explorer.findNode(data.explorer, targetId);

    let childrenIds: string[] | undefined;
    if (
      nodeDeleteCandidate?.type !== "request" &&
      nodeDeleteCandidate?.children
    ) {
      childrenIds = Explorer.traverseAllNodes(
        nodeDeleteCandidate?.children
      ).map((node) => node.id);
    }
    // Cleans the history from the deleted nodes
    const newHistory = Explorer.trimHistoryNodes(newExplorer, history);
    setHistory(newHistory);

    // console.log({ prev: history, new: newHistory });

    // Updates the cwd
    // Checks if the cwd's latest node still exist in the history
    const cwdStillValid = newHistory.some(
      (history) => history.id === store.cwd.at(-1)?.id
    );
    if (!cwdStillValid) {
      const cwdCandidate = newHistory.at(-1);
      store.setSelectedNode(cwdCandidate);
      if (cwdCandidate) {
        store.setCwd(Explorer.getNodePath(newExplorer, cwdCandidate.id));
      }
    }

    deleteExplorerNodeOptimistically(
      (current) => ({
        ...current,
        explorer: newExplorer,
      }),
      targetId,
      childrenIds
    );
  };

  const selectNode = (node: HistoryNode) => {
    const data = getData();
    if (!data) return;
    _changeFocus(data.explorer, node);
  };

  const toggleOpenState = (targetId: string) => {
    updateWorkspaceOptimistically((current) => ({
      ...current,
      explorer: Explorer.toggleNodeOpenState(current.explorer, targetId),
    }));
  };

  const updateNodeName = (node: HistoryNode, name: string) => {
    updateWorkspaceOptimistically((cur) => {
      const newHistory: HistoryNode[] = history.map((hist) => {
        return hist.id === store.selectedNode?.id
          ? { ...hist, title: name }
          : hist;
      });

      const newExplorer = Explorer.changeNodeName(cur.explorer, node.id, name);
      if (store.selectedNode) {
        store.setSelectedNode({ ...store.selectedNode, title: name });
        store.setCwd(Explorer.getNodePath(newExplorer, store.selectedNode.id));
      }
      setHistory(newHistory);
      return {
        ...cur,
        explorer: newExplorer,
      };
    });
  };

  const updateMethod = (method: HTTPMethods) => {
    const data = getData();
    if (!data || !store.selectedNode?.id) return;
    const updatedExplorer: ExplorerTreeNode[] = Explorer.changeNodeMethod(
      data.explorer,
      store.selectedNode.id,
      method
    );
    const newHistory: HistoryNode[] = history.map((hist) => {
      return hist.id === store.selectedNode?.id
        ? { ...hist, httpMethod: method }
        : hist;
    });

    if (store.selectedNode) {
      const cwd = Explorer.getNodePath(updatedExplorer, store.selectedNode.id);
      store.setCwd(cwd);
      // Updates the breadcrumb node to match the newest updated tree node
      store.setSelectedNode(cwd.at(-1));
      setHistory(newHistory);
      updateWorkspaceOptimistically((cur) => ({
        ...cur,
        explorer: Explorer.changeNodeMethod(
          updatedExplorer,
          store.selectedNode!.id,
          method
        ),
      }));
    }
    updateRequestOptimistically(
      (cur) => ({
        ...cur,
        method,
      }),
      store.selectedNode.id
    );
  };

  const clearExplorerSelection = () => {
    store.setSelectedNode(undefined);
    store.setCwd([]);
    setHistory([]);
  };

  return {
    ...store,
    insertRequest,
    insertCollection,
    insertGroup,
    toggleOpenState,
    selectNode,
    updateNodeName,
    updateMethod,
    deleteNode,
    clearExplorerSelection,
    search,
  };
}
