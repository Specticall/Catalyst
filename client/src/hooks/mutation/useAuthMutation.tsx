import { useToast } from "@/components/ui/Toast";
import { API } from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWorkspaceManager from "../managers/useWorkspaceManager";
import useExplorerManager from "../managers/useExplorerManager";

export type AuthProviders = "google";
type LoginPayload = {
  token: string;
  provider: AuthProviders;
};
export default function useAuthMutation() {
  const navigate = useNavigate();
  const toast = useToast();
  const { clearWorkspaceId } = useWorkspaceManager();
  const { clearExplorerSelection } = useExplorerManager();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => API.post("/auth/login", data),
    onSuccess: () => {
      navigate("/app");
    },
    onError: () => {
      toast.error("Oops! couldn't sign you in");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => API.post("/auth/logout"),
    onSuccess: () => {
      navigate("/login");
      clearWorkspaceId();
      clearExplorerSelection();
      queryClient.clear();
    },
    onError: () => {
      toast.error("Oops! couldn't log you out");
    },
  });

  return { loginMutation, logoutMutation };
}
