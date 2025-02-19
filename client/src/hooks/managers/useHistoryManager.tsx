import { HistoryNode } from "@/context/explorer/explorerTypes";
import useExplorerStore from "@/stores/explorerStore";
import useHistoryStore from "@/stores/historyStore";
import { Explorer } from "@/utils/Explorer";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";

export default function useHistoryManager() {
  const { setSelectedNode, selectedNode, setCwd } = useExplorerStore();
  const { history, setHistory } = useHistoryStore();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);

  const popHistory = (node: HistoryNode) => {
    if (!data) return;
    const newHistory = history.filter((cur) => cur.id !== node.id);
    // Check if the user deletes the current working directory
    const isCwd = node.id === selectedNode?.id;
    if (isCwd) {
      // Reassign the cwd to the right most history node
      const newSelectedNode = newHistory.at(-1);
      if (newSelectedNode) {
        setCwd(Explorer.getNodePath(data.explorer, newSelectedNode.id));
      } else {
        setCwd([]);
      }
      setSelectedNode(newSelectedNode);
    }

    setHistory(newHistory);
  };

  const pushHistory = (node: HistoryNode) => {
    const alreadyExists = history.some((h) => h.id === node.id);
    if (!alreadyExists) {
      setHistory([...history, node]);
    }
  };

  return { popHistory, pushHistory, history, setHistory };
}
