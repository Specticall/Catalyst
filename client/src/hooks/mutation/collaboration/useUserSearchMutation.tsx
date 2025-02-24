import { API } from "@/utils/API";
import { SuccessReponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useUserSearchMutation() {
  const userSearchMutation = useMutation({
    mutationFn: async (query: string) => {
      const urlQuery = query ? `?seachQuery=${query}` : "";
      const res = await API.post<SuccessReponse<unknown>>(`/search${urlQuery}`);
      return res.data.data;
    },
    onMutate: () => {
      // cancel
    },
  });

  return userSearchMutation;
}
