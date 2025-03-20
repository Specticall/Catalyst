import useWorkspaceStore from "@/stores/workspaceStore";
import Cookies from "js-cookie";
import useExplorerManager from "./useExplorerManager";

export default function useWorkspaceManager() {
  const { setWorkspaceId, workspaceId } = useWorkspaceStore();
  const { clearExplorerSelection } = useExplorerManager();

  const selectWorkspaceId = (id?: number) => {
    const newWorkspaceId = workspaceId === id ? undefined : id;
    if (newWorkspaceId === undefined) {
      localStorage.removeItem("workspaceId");
      // Cookies.remove("workspaceId");
    } else {
      localStorage.setItem("workspaceId", String(newWorkspaceId));
      // Cookies.set("workspaceId", String(newWorkspaceId));
    }
    clearExplorerSelection();
    setWorkspaceId(newWorkspaceId);
  };

  const clearWorkspaceId = () => {
    localStorage.removeItem("workspaceId");
    // Cookies.remove("workspaceId");
    setWorkspaceId(undefined);
  };

  return { selectWorkspaceId, clearWorkspaceId, workspaceId };
}
