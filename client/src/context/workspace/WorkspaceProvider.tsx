import { ReactNode, createContext, useContext, useReducer } from "react";
import { WorkspaceAction, WorkspaceState } from "./workspaceTypes";
import { reducer } from "./workspaceReducer";
import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";
import { useExplorer } from "../explorer/ExplorerProvider";
import useRequestQuery from "@/hooks/queries/useRequestQuery";
import useWorkspaceUpdater from "@/hooks/updaters/useWorkspaceUpdater";
type WorkspaceContextValues = {
  state: WorkspaceState;
  dispatch: React.ActionDispatch<[action: WorkspaceAction]>;

  /**
   * Stores the loading state of server side
   */
  isLoadingWorkspace: boolean;
  sendRequest: () => Promise<void>;
  save: () => void;
  changeMethod: (method: HTTPMethods) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValues | null>(null);

const initalState: WorkspaceState = {
  bodyJSON: "",
  data: undefined,
  error: undefined,
  method: "GET",
  url: "",
  isFetching: false,
  activeOption: "Body",
  isSaving: false,
  bodyErrorMessage: "",
  headers: undefined,
  prevWorkspaceContainerScrollY: "",
};

/* eslint-disable react-refresh/only-export-components */
export const requestOptionsData = [
  "Body",
  "Headers",
  // "Params",
  // "Cookies",
] as const;
export type RequestOptionsData = (typeof requestOptionsData)[number];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  const {
    state: { selectedId, currentWorkingDirectory: cwd },
  } = useExplorer();

  const requestQuery = useRequestQuery({
    requestId: selectedId,
  });

  const { changeMethod, save, sendRequest } = useWorkspaceUpdater({
    dispatch,
    state,
  });

  return (
    <WorkspaceContext.Provider
      value={{
        save,
        state,
        dispatch,
        sendRequest,
        changeMethod,
        isLoadingWorkspace: requestQuery.isPending,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context)
    throw new Error(
      "useWorkspace must be used inside of it's Provider's scope"
    );
  return context;
}
