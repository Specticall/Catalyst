import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import useExplorerHistoryStore from "@/stores/explorerHistoryStore";
import { Explorer } from "@/utils/Explorer";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";
import useHistoryManager from "./useHistoryManager";
import { HistoryNode } from "@/context/explorer/explorerTypes";

export default function useExplorerManager() {
  const queryClient = useQueryClient();
  const { pushHistory } = useHistoryManager();
  const { setCwd, setSelectedNode, selectedNode, history, setHistory } =
    useExplorerHistoryStore();

  const data = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);
  const updateWorkspaceState = (updater: (current: Workspace) => Workspace) => {
    queryClient.setQueriesData<Workspace>(
      { queryKey: [QUERY_KEYS.WORKSPACE] },
      (current) => (current ? updater(current) : undefined)
    );
  };

  const insertRequest = (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "request",
      httpMethod: "GET",
      id: v4(),
      title: "New Request",
    };

    updateWorkspaceState((current) => {
      pushHistory(newNode);
      setCwd(Explorer.getNodePath(current.explorer, newNode.id));
      return {
        ...current,
        explorer: Explorer.insertNode(current.explorer, targetId, newNode),
      };
    });
  };

  const insertCollection = () => {
    const newNode: ExplorerTreeNode = {
      type: "collection",
      id: v4(),
      isOpen: true,
      title: "New Collection",
      children: [],
    };
    updateWorkspaceState((current) => {
      pushHistory(newNode);
      setCwd(Explorer.getNodePath(current.explorer, newNode.id));
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
    updateWorkspaceState((current) => {
      pushHistory(newNode);
      setCwd(Explorer.getNodePath(current.explorer, newNode.id));
      return {
        ...current,
        explorer: Explorer.insertNode(current.explorer, targetId, newNode),
      };
    });
  };

  const selectNode = (node: HistoryNode) => {
    if (!data) return;
    setSelectedNode(node);
    setCwd(Explorer.getNodePath(data.explorer, node.id));
    pushHistory(node);
  };

  const toggleOpenState = (targetId: string) => {
    updateWorkspaceState((current) => ({
      ...current,
      explorer: Explorer.toggleNodeOpenState(current.explorer, targetId),
    }));
  };

  const updateNodeName = (node: HistoryNode, name: string) => {
    if (!data) return;
    const newHistory: HistoryNode[] = history.map((hist) => {
      return hist.id === selectedNode?.id ? { ...hist, title: name } : hist;
    });

    if (selectedNode) {
      setCwd(Explorer.getNodePath(data?.explorer, selectedNode.id));
    }
    setHistory(newHistory);
    updateWorkspaceState((cur) => ({
      ...cur,
      explorer: Explorer.changeNodeName(data.explorer, node.id, name),
    }));
  };

  return {
    insertRequest,
    insertCollection,
    insertGroup,
    toggleOpenState,
    selectNode,
    updateNodeName,
  };
}
