import { HistoryNode } from "@/context/explorer/explorerTypes";
import { create } from "zustand";

type ExplorerState = {
  cwd: HistoryNode[]; // current working directory
  selectedNode?: HistoryNode;
  setCwd: (cwd: HistoryNode[]) => void;
  setSelectedNode: (node?: HistoryNode) => void;
};

const useExplorerStore = create<ExplorerState>((set) => ({
  cwd: [],
  history: [],
  activeNode: undefined,
  setCwd: (cwd) => set((cur) => ({ ...cur, cwd })),
  setSelectedNode: (node) => set((cur) => ({ ...cur, selectedNode: node })),
}));

export default useExplorerStore;
