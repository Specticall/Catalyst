import { create } from "zustand";
import { getWorkspaceId } from "@/utils/lib";

type WorkspaceState = {
  workspaceId?: number;
  setWorkspaceId: (id?: number) => void;
};

const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaceId: getWorkspaceId(),
  setWorkspaceId: (id) =>
    set((cur) => {
      return { ...cur, workspaceId: id };
    }),
}));

export default useWorkspaceStore;
