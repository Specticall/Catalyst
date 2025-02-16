import { HistoryNode } from "@/context/explorer/explorerTypes";
import { create } from "zustand";

type HistoryState = {
  history: HistoryNode[];
  setHistory: (history: HistoryNode[]) => void;
};

const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  setHistory: (history) => set((cur) => ({ ...cur, history })),
}));

export default useHistoryStore;
