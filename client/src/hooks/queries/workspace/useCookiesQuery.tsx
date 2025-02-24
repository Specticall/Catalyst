import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Cookie, SuccessReponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export type CompactCookie = Record<
  Cookie["domain"],
  { id: number; name: string }[]
>;

export default function useCookiesQuery({
  collectionId,
}: {
  collectionId?: string;
}) {
  const cookiesQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<CompactCookie>>(
        `/cookies/all/${collectionId}`
      );
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.COOKIES, collectionId],
    enabled: Boolean(collectionId),
    staleTime: Infinity,
  });

  return cookiesQuery;
}
