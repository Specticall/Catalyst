import { HistoryNode } from "@/context/explorer/explorerTypes";
import { create } from "zustand";

type ExplorerState = {
  selectedId: string | undefined;
  history: HistoryNode[];
  currentWorkingDirectory: HistoryNode[];
};

const explorerStore = create((set) => ({}));
