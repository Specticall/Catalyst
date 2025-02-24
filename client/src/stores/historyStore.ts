import { HistoryNode } from "@/utils/types";
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
