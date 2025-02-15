import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";

type ExplorerUpdatePayload = {
  explorer: ExplorerTreeNode[];
};
export default function useExplorerMutation() {
  const explorerUpdateMutation = useMutation({
    mutationFn: (data: ExplorerUpdatePayload) => API.put("/workspaces/1", data),
  });

  return { explorerUpdateMutation };
}
