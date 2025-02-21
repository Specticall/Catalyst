import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Protect({ children }: Props) {
  const navigate = useNavigate();
  const loggedInUserQuery = useQuery({
    queryFn: () => API.get("/auth/user"),
    queryKey: [QUERY_KEYS.LOGGED_IN_USER],
    retry: false,
  });

  useEffect(() => {
    if (loggedInUserQuery.isError) {
      navigate("/login");
    }
  }, [loggedInUserQuery.isError, navigate]);

  if (loggedInUserQuery.isPending) {
    return <div>Authenticating, Please Wait</div>;
  }

  return children;
}
