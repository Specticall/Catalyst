import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AcceptInvitePayload = {
  userWorkspaceId: number;
};
export default function useAcceptInviteMutation() {
  const queryClient = useQueryClient();
  const acceptInviteMutation = useMutation({
    mutationFn: (data: AcceptInvitePayload) =>
      API.post("/workspaces/accept-invite", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_WORKSPACES] });
    },
  });

  return acceptInviteMutation;
}
