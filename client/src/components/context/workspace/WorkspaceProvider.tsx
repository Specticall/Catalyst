import { ReactNode, createContext, useContext, useReducer } from "react";
import { WorkspaceAction, WorkspaceState } from "./workspaceTypes";
import { reducer } from "./workspaceReducer";

type WorkspaceContextValues = {
  state: WorkspaceState;
  dispatch: React.ActionDispatch<[action: WorkspaceAction]>;
};

const WorkspaceContext = createContext<WorkspaceContextValues | null>(null);

const initalState: WorkspaceState = {
  body: undefined,
  method: "GET",
  url: "",
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
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
