import { API } from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceManager from "../../managers/useWorkspaceManager";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, Workspace } from "@/utils/types";
import { useToast } from "@/components/ui/Toast";
import useWorkspaceStore from "@/stores/workspaceStore";

type UpdatePayload = {
  workspaceId: number;
  name: string;
};
export default function useWorkspaceMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { selectWorkspaceId } = useWorkspaceManager();
  const { workspaceId } = useWorkspaceStore();

  const createWorkspaceMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await API.post<SuccessReponse<Workspace>>("/workspaces", {
        name,
      });
      return res.data.data;
    },
    onSuccess: (data) => {
      toast.success("Succesfuly created a new workspace");
      selectWorkspaceId(data.id);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_WORKSPACES] });
    },
    onError: () => {
      toast.error("Oops! couldn't create workspace");
    },
  });

  const updateWorkspaceMutation = useMutation({
    mutationFn: (data: UpdatePayload) => API.put("/workspaces", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_WORKSPACES] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
      });
    },
    onError: () => {
      toast.error("Oops! couldn't create workspace");
    },
  });

  return { createWorkspaceMutation, updateWorkspaceMutation };
}
