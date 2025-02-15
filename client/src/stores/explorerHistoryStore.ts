import { HistoryNode } from "@/context/explorer/explorerTypes";
import { create } from "zustand";

type ExplorerState = {
  history: HistoryNode[];
  cwd: HistoryNode[]; // current working directory
  selectedNode?: HistoryNode;
  setCwd: (cwd: HistoryNode[]) => void;
  setHistory: (history: HistoryNode[]) => void;
  setSelectedNode: (node?: HistoryNode) => void;
};

const useExplorerHistoryStore = create<ExplorerState>((set) => ({
  cwd: [],
  history: [],
  activeNode: undefined,
  setCwd: (cwd) => set((cur) => ({ ...cur, cwd })),
  setSelectedNode: (node) => set((cur) => ({ ...cur, selectedNode: node })),
  setHistory: (history) => set((cur) => ({ ...cur, history })),
}));

export default useExplorerHistoryStore;
