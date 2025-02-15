import { useContext, useReducer, createContext, ReactNode } from "react";
import { ExplorerActions, ExplorerState } from "./explorerTypes";
import { reducers } from "./explorerReducer";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";
import { ExplorerUpdater } from "@/hooks/updaters/useExplorerUpdater";
import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as getUUID } from "uuid";
import { Explorer } from "@/utils/Explorer";
import { Workspace } from "@/utils/types";

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
  const { data, isLoading } = useWorkspaceQuery();

  // const explorer = useExplorerUpdater({ dispatch, state });

  // Mounts the initial data from the server onto the client side state
  // useEffect(() => {
  //   if (!data) return;
  //   dispatch({ type: "load/tree", payload: data.explorer });
  // }, [data]);

  const queryClient = useQueryClient();

  const insertCollection = async (targetId: string) => {
    const newNode: ExplorerTreeNode = {
      type: "request",
      httpMethod: "GET",
      id: getUUID(),
      title: "New Request",
    };
    const newTree = Explorer.insertNode(state.tree, targetId, newNode);
    queryClient.setQueriesData<Workspace>(
      { queryKey: [QUERY_KEYS.WORKSPACE] },
      (current) => {
        if (!current) return undefined;
        return { ...current, explorer: newTree };
      }
    );
  };

  return (
    <ExplorerContext.Provider
      value={{
        // TEMP
        state,
        dispatch,
        // explorer,
        isLoadingTree: isLoading,
      }}
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
