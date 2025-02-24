import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceStore from "@/stores/workspaceStore";

type Payload = {
  workspace: Workspace;
  targetId: string;
  childrenIds?: string[];
};
export default function useExplorerDeleteMutation() {
  const queryClient = useQueryClient();
  const { workspaceId } = useWorkspaceStore();

  const explorerDeleteMutation = useMutation({
    mutationFn: ({ workspace, targetId, childrenIds }: Payload) => {
      return API.put(`/explorers/remove/${targetId}`, {
        explorer: workspace.explorer,
        workspaceId: workspace.id,
        childrenIds,
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
      });
      const prevWorkspace = queryClient.getQueryData<Workspace>([
        QUERY_KEYS.WORKSPACE,
        workspaceId,
      ]);
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE, workspaceId] },
        data.workspace
      );
      return prevWorkspace;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
      });
    },
    onError: (_, __, context) => {
      console.log("FAILED TO DELETE EXPLORER DATA");
      if (!context) return;
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE, workspaceId] },
        context
      );
    },
  });

  const deleteExplorerNodeOptimistically = (
    updater: (current: Workspace) => Workspace,
    targetId: string,
    childrenIds?: string[]
  ) => {
    const data = queryClient.getQueryData<Workspace>([
      QUERY_KEYS.WORKSPACE,
      workspaceId,
    ]);
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
