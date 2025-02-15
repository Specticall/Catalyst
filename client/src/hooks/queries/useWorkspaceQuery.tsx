import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, Workspace } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useWorkspaceQuery() {
  const workspaceQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<Workspace>>("/workspaces/1");
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.WORKSPACE],
  });

  return workspaceQuery;
}
