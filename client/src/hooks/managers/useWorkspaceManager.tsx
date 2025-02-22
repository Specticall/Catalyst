import useWorkspaceStore from "@/stores/workspaceStore";
import Cookies from "js-cookie";
import useExplorerManager from "./useExplorerManager";

export default function useWorkspaceManager() {
  const { setWorkspaceId, workspaceId } = useWorkspaceStore();
  const { clearExplorerSelection } = useExplorerManager();

  const selectWorkspaceId = (id?: number) => {
    const newWorkspaceId = workspaceId === id ? undefined : id;
    if (newWorkspaceId === undefined) {
      Cookies.remove("workspaceId");
    } else {
      Cookies.set("workspaceId", String(newWorkspaceId));
    }
    clearExplorerSelection();
    setWorkspaceId(newWorkspaceId);
  };

  const clearWorkspaceId = () => {
    Cookies.remove("workspaceId");
    setWorkspaceId(undefined);
  };

  return { selectWorkspaceId, clearWorkspaceId, workspaceId };
}
