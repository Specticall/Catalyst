import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, Workspace } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import useWorkspaceStore from "@/stores/workspaceStore";

export default function useWorkspaceQuery() {
  const { workspaceId } = useWorkspaceStore();
  const workspaceQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<Workspace>>("/workspaces");
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.WORKSPACE, workspaceId],
    enabled: Boolean(typeof workspaceId !== "undefined"),
  });

  return workspaceQuery;
}
