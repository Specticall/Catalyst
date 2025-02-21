import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useLoggedInUserQuery() {
  const loggedInUserQuery = useQuery({
    queryFn: async () => {
      const res = await API.get<SuccessReponse<User>>("/auth/user");
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.LOGGED_IN_USER],
    retry: false,
  });

  return loggedInUserQuery;
}
