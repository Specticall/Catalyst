import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Workspace } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceStore from "@/stores/workspaceStore";

export default function useExplorerUpdateMutation() {
  const queryClient = useQueryClient();
  const { workspaceId } = useWorkspaceStore();

  const explorerUpdateMutation = useMutation({
    mutationFn: (data: Workspace) => {
      return API.put("/explorers", { workspace: { ...data, workspaceId: 1 } });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
      });
      const prevWorkspace = queryClient.getQueryData<Workspace>([
        QUERY_KEYS.WORKSPACE,
      ]);
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE, workspaceId] },
        data
      );
      return prevWorkspace;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
      });
    },
    onError: (_, __, context) => {
      console.log("FAILED TO SAVE WORKSPACE DATA");
      if (!context) return;
      queryClient.setQueriesData<Workspace>(
        { queryKey: [QUERY_KEYS.WORKSPACE, workspaceId] },
        context
      );
    },
  });

  const updateWorkspaceOptimistically = (
    updater: (current: Workspace) => Workspace
  ) => {
    const data = queryClient.getQueryData<Workspace>([
      QUERY_KEYS.WORKSPACE,
      workspaceId,
    ]);
    if (data) explorerUpdateMutation.mutateAsync(updater(data));
  };

  return { updateWorkspaceOptimistically };
}
