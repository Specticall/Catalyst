import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Cookie, SuccessReponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useCookieDetailQuery({
  cookieId,
}: {
  cookieId?: number;
}) {
  const cookieDetailQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<Cookie>>(`/cookies/${cookieId}`);
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.COOKIES_DETAIL, cookieId],
    enabled: typeof cookieId !== "undefined",
  });

  return cookieDetailQuery;
}
