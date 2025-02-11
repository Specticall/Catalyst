import { useContext, useReducer, createContext, ReactNode } from "react";
import { contentTree } from "@/components/sidebar/explorer/explorerTree";
import { ExplorerActions, ExplorerState } from "./explorerTypes";
import { reducers } from "./explorerReducer";

const initialState: ExplorerState = {
  tree: contentTree,
  selectedId: undefined,
  history: [],
  currentWorkingDirectory: [],
};

const ExplorerContext = createContext<{
  state: ExplorerState;
  dispatch: React.ActionDispatch<[action: ExplorerActions]>;
} | null>(null);

export default function ExplorerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <ExplorerContext.Provider value={{ state, dispatch }}>
      {children}
    </ExplorerContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useExplorer() {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error("useExplorer must be used inside of it's Provider's scope");
  return context;
}
