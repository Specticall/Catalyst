import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Request, SuccessReponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useRequestQuery({
  requestId,
  isRequest,
}: {
  requestId?: string;
  isRequest: boolean;
}) {
  const requestQuery = useQuery({
    queryFn: () => API.get<SuccessReponse<Request>>(`/requests/${requestId}`),
    queryKey: [QUERY_KEYS.REQUEST, requestId],
    enabled: Boolean(requestId && isRequest),
    staleTime: Infinity,
  });

  const data = requestQuery.data?.data.data;

  return { data, requestQuery };
}
