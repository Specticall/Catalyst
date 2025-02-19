import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useExplorerCreateMutation() {
  const queryClient = useQueryClient();

  const explorerCreateNodeMutation = useMutation({
    mutationFn: ({
      workspace,
      newNode,
    }: {
      workspace: Workspace;
      newNode: ExplorerTreeNode;
    }) => {
      const createRequestQuery =
        newNode.type === "request" ? "?new-request=true" : "";
      return API.put(`/explorers/create/${newNode.id}${createRequestQuery}`, {
        workspace,
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.WORKSPACE] });
      const prevWorkspace = queryClient.getQueryData<Workspace>([
        QUERY_KEYS.WORKSPACE,
      ]);
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE] },
        data.workspace
      );
      return prevWorkspace;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACE] });
    },
    onError: (_, __, context) => {
      console.log("FAILED TO SAVE WORKSPACE DATA");
      if (!context) return;
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE] },
        context
      );
    },
  });

  const createExplorerNodeOptimistically = (
    updater: (current: Workspace) => Workspace,
    newNode: ExplorerTreeNode
  ) => {
    const data = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);
    if (data)
      explorerCreateNodeMutation.mutateAsync({
        workspace: updater(data),
        newNode,
      });
  };

  return {
    createExplorerNodeOptimistically,
  };
}
