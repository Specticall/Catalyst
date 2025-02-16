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
import { HistoryNode } from "@/context/explorer/explorerTypes";
import useExplorerCreateMutation from "../mutation/useExplorerCreateMutation";
import useExplorerUpdateMutation from "../mutation/useExplorerUpdateMutation";
import useRequestMutation from "../mutation/useRequestMutation";

export default function useExplorerManager() {
  const queryClient = useQueryClient();
  const { pushHistory, history, setHistory } = useHistoryManager();
  const store = useExplorerStore();
  const { updateWorkspaceOptimistically } = useExplorerUpdateMutation();
  const { updateRequestOptimistically } = useRequestMutation();
  const { createExplorerNodeOptimistically } = useExplorerCreateMutation();

  const data = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);

  const insertRequest = (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "request",
      httpMethod: "GET",
      id: v4(),
      title: "New Request",
    };

    createExplorerNodeOptimistically((current) => {
      pushHistory(newNode);
      store.setCwd(Explorer.getNodePath(current.explorer, newNode.id));
      store.setSelectedNode(newNode);
      return {
        ...current,
        explorer: Explorer.insertNode(current.explorer, targetId, newNode),
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
    store.setSelectedNode(newNode);
    updateWorkspaceOptimistically((current) => {
      return {
        ...current,
        explorer: [...current.explorer, newNode],
      };
    });
  };

  const insertGroup = (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "group",
      id: v4(),
      isOpen: true,
      title: "New Group",
      children: [],
    };
    updateWorkspaceOptimistically((current) => {
      pushHistory(newNode);
      store.setCwd(Explorer.getNodePath(current.explorer, newNode.id));
      store.setSelectedNode(newNode);
      return {
        ...current,
        explorer: Explorer.insertNode(current.explorer, targetId, newNode),
      };
    });
  };

  const selectNode = (node: HistoryNode) => {
    if (!data) return;
    store.setSelectedNode(node);
    store.setCwd(Explorer.getNodePath(data.explorer, node.id));
    pushHistory(node);
  };

  const toggleOpenState = (targetId: string) => {
    updateWorkspaceOptimistically((current) => ({
      ...current,
      explorer: Explorer.toggleNodeOpenState(current.explorer, targetId),
    }));
  };

  const updateNodeName = (node: HistoryNode, name: string) => {
    if (!data) return;
    const newHistory: HistoryNode[] = history.map((hist) => {
      return hist.id === store.selectedNode?.id
        ? { ...hist, title: name }
        : hist;
    });

    if (store.selectedNode) {
      store.setCwd(Explorer.getNodePath(data?.explorer, store.selectedNode.id));
    }
    setHistory(newHistory);
    updateWorkspaceOptimistically((cur) => ({
      ...cur,
      explorer: Explorer.changeNodeName(data.explorer, node.id, name),
    }));
  };

  const updateMethod = (method: HTTPMethods) => {
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

  return {
    ...store,
    insertRequest,
    insertCollection,
    insertGroup,
    toggleOpenState,
    selectNode,
    updateNodeName,
    updateMethod,
  };
}
