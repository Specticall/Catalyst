import {
  useContext,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { ExplorerActions, ExplorerState } from "./explorerTypes";
import { reducers } from "./explorerReducer";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";
import useExplorerUpdater, {
  ExplorerUpdater,
} from "@/hooks/updaters/useExplorerUpdater";

const initialState: ExplorerState = {
  // tree: contentTree,
  tree: [],
  selectedId: undefined,
  history: [],
  currentWorkingDirectory: [],
};

const ExplorerContext = createContext<{
  /**
   * Reducer actions
   */
  state: ExplorerState;
  dispatch: React.ActionDispatch<[action: ExplorerActions]>;

  /**
   * Handles the explorer tree update actions
   */
  explorer: ExplorerUpdater;

  /**
   * State to keep track the explorer query's loading state
   */
  isLoadingTree: boolean;
} | null>(null);

export default function ExplorerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducers, initialState);
  const {
    data,
    workspaceQuery: { isLoading },
  } = useWorkspaceQuery();

  const explorer = useExplorerUpdater({ dispatch, state });

  // Mounts the initial data from the server onto the client side state
  useEffect(() => {
    if (!data) return;
    dispatch({ type: "load/tree", payload: data.explorer });
  }, [data]);

  return (
    <ExplorerContext.Provider
      value={{ state, dispatch, explorer, isLoadingTree: isLoading }}
    >
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
