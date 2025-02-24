import Button from "@/components/ui/Button";
import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarAuthButton() {
  const { data } = useLoggedInUserQuery();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === "/login") {
    return;
  }

  if (data?.id) {
    return (
      <Button
        variant={"hollow-accent"}
        className="py-3 hover:opacity-75 transition duration-50"
        onClick={() => navigate("/app")}
      >
        Workspace
      </Button>
    );
  }

  return (
    <Button
      variant={"hollow-accent"}
      className="py-3 hover:opacity-75 transition duration-50"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );
}
