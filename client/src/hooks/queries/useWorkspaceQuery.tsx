import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, Workspace } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useWorkspaceQuery() {
  const workspaceQuery = useQuery({
    queryFn: () => API.get<SuccessReponse<Workspace>>("/workspaces/1"),
    queryKey: [QUERY_KEYS.WORKSPACE],
  });

  const data = workspaceQuery.data?.data.data;

  return { data, workspaceQuery };
}
