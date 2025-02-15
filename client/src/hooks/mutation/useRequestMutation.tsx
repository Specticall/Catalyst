import { API } from "@/utils/API";
import { Request } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

type UpdateRequestPayload = {
  requestData: Request;
};
export default function useRequestMutation() {
  const createRequestMutation = useMutation({
    mutationFn: (requestId: string) => API.post(`/requests/${requestId}`),
  });
  const updateRequestMutation = useMutation({
    mutationFn: (data: UpdateRequestPayload) => API.put("/requests", data),
  });

  return { createRequestMutation, updateRequestMutation };
}
