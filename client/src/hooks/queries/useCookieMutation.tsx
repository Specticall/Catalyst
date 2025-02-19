import { useToast } from "@/components/ui/Toast";
import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Cookie } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdatePayload = Cookie;
type CreatePayload = Omit<Cookie, "id">;
export default function useCookieMutation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: UpdatePayload) => API.put(`/cookies`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COOKIES_DETAIL, id],
      });
      toast.success("Successfuly updated cookie");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreatePayload) => API.post(`/cookies`, data),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COOKIES, collectionId],
      });
      toast.success("Successfuly created cookie");
    },
  });

  return { updateMutation, createMutation };
}
