import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import { HistoryNode } from "@/utils/types";
import { create } from "zustand";

type ExplorerState = {
  cwd: HistoryNode[]; // current working directory
  selectedNode?: HistoryNode;
  workspaceSearchResults?: ExplorerTreeNode[];
  setCwd: (cwd: HistoryNode[]) => void;
  setSelectedNode: (node?: HistoryNode) => void;
  setWorkspaceSearchResults: (node?: ExplorerTreeNode[]) => void;
};

const useExplorerStore = create<ExplorerState>((set) => ({
  cwd: [],
  history: [],
  activeNode: undefined,
  workspaceSearchResults: undefined,
  setCwd: (cwd) => set((cur) => ({ ...cur, cwd })),
  setSelectedNode: (node) => set((cur) => ({ ...cur, selectedNode: node })),
  setWorkspaceSearchResults: (res) =>
    set((cur) => ({
      ...cur,
      workspaceSearchResults: res,
    })),
}));

export default useExplorerStore;
