import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Request } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRequestMutation() {
  const queryClient = useQueryClient();

  const updateRequestMutation = useMutation({
    mutationFn: ({ data }: { data: Request; selectedId: string }) => {
      return API.put("/requests", { requestData: data });
    },
    onMutate: async ({ data, selectedId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.REQUEST] });
      const prevData = queryClient.getQueryData([
        QUERY_KEYS.REQUEST,
        selectedId,
      ]);
      queryClient.setQueryData([QUERY_KEYS.REQUEST, selectedId], data);
      return { prevData, selectedId };
    },
    onError: (_, __, context) => {
      if (!context?.prevData || !context.selectedId) return;
      queryClient.setQueryData(
        [QUERY_KEYS.REQUEST, context.selectedId],
        context.prevData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REQUEST });
    },
  });

  const updateRequestOptimistically = (
    updater: (current: Request) => Request,
    selectedId: string
  ) => {
    const data = queryClient.getQueryData<Request>([
      QUERY_KEYS.REQUEST,
      selectedId,
    ]);
    if (data) {
      updateRequestMutation.mutateAsync({
        data: updater(data),
        selectedId,
      });
    }
  };

  return {
    updateRequestMutation,
    updateRequestOptimistically,
  };
}
