import useWorkspaceStore from "@/stores/workspaceStore";
import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, WorkspaceMembers } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useWorkspaceMembersQuery() {
  const { workspaceId } = useWorkspaceStore();
  const workspaceMembersQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<WorkspaceMembers[]>>(
        `/workspaces/members`
      );
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.WORKSPACE_MEMBERS, workspaceId],
    enabled: Boolean(typeof workspaceId !== "undefined"),
  });

  return workspaceMembersQuery;
}
