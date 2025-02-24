import { useToast } from "@/components/ui/Toast";
import useWorkspaceStore from "@/stores/workspaceStore";
import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UserInvitePayload = {
  recepientId: number;
  query: string;
};
export default function useUserInviteMutation() {
  const toast = useToast();
  const { workspaceId } = useWorkspaceStore();
  const queryClient = useQueryClient();
  const userInviteMutation = useMutation({
    mutationFn: (data: UserInvitePayload) =>
      API.post("/workspaces/invite", { recepientId: data.recepientId }),
    onSuccess: (_, { query }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_SEARCH, query],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE_MEMBERS, workspaceId],
      });
      toast.success("Succesfully sent invite");
    },
    onError: () => {
      toast.error("Oops! Coun't send invite");
    },
  });

  return userInviteMutation;
}
