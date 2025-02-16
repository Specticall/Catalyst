import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Request, SuccessReponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useRequestQuery({ requestId }: { requestId?: string }) {
  const requestQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<Request>>(
        `/requests/${requestId}`
      );
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.REQUEST, requestId],
    enabled: Boolean(requestId),
  });

  return requestQuery;
}
