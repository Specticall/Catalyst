import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Protect({ children }: Props) {
  const navigate = useNavigate();
  const loggedInUserQuery = useLoggedInUserQuery();

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
