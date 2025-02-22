import { API } from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceManager from "../managers/useWorkspaceManager";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, Workspace } from "@/utils/types";
import { useToast } from "@/components/ui/Toast";

export default function useWorkspaceMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { selectWorkspaceId } = useWorkspaceManager();

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

  return { createWorkspaceMutation };
}
