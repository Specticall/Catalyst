import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, WorkspacePreview } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useUserWorkspacesQuery() {
  const userWorkspacesQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<WorkspacePreview[]>>(
        `/workspaces/all`
      );
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.USER_WORKSPACES],
  });

  return userWorkspacesQuery;
}
