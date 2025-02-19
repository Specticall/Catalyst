import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Payload = {
  workspace: Workspace;
  targetId: string;
  childrenIds?: string[];
};
export default function useExplorerDeleteMutation() {
  const queryClient = useQueryClient();

  const explorerDeleteMutation = useMutation({
    mutationFn: ({ workspace, targetId, childrenIds }: Payload) => {
      return API.put(`/explorers/remove/${targetId}`, {
        explorer: workspace.explorer,
        workspaceId: workspace.id,
        childrenIds,
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
      console.log("FAILED TO DELETE EXPLORER DATA");
      if (!context) return;
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE] },
        context
      );
    },
  });

  const deleteExplorerNodeOptimistically = (
    updater: (current: Workspace) => Workspace,
    targetId: string,
    childrenIds?: string[]
  ) => {
    const data = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);
    if (!data) return;
    explorerDeleteMutation.mutateAsync({
      workspace: updater(data),
      targetId,
      childrenIds,
    });
  };

  return {
    deleteExplorerNodeOptimistically,
  };
}
