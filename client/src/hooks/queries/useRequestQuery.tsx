import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Request, SuccessReponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useRequestQuery({
  requestId,
  isRequest,
  onSettled,
}: {
  requestId?: string;
  isRequest: boolean;
  onSettled?: (data: Request) => void;
}) {
  const requestQuery = useQuery({
    queryFn: () => API.get<SuccessReponse<Request>>(`/requests/${requestId}`),
    queryKey: [QUERY_KEYS.REQUEST, requestId],
    enabled: Boolean(requestId && isRequest),
    staleTime: Infinity,
  });

  const data = requestQuery.data?.data.data;
  useEffect(() => {
    if (!requestQuery.isPending && data) {
      if (onSettled) onSettled(data);
    }
  }, [data, requestQuery.isPending]);

  return { data, requestQuery };
}
