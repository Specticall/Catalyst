import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { WorkspaceAction, WorkspaceState } from "./workspaceTypes";
import { reducer } from "./workspaceReducer";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";

type WorkspaceContextValues = {
  state: WorkspaceState;
  dispatch: React.ActionDispatch<[action: WorkspaceAction]>;
  sendRequest: () => Promise<void>;
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
};

type RequestData = {
  method: HTTPMethods;
  url: string;
  body?: unknown;
};

async function fetchRequest(data: RequestData) {
  try {
    const method = data.method.toLowerCase();
    return await axios({
      method,
      url: data.url,
      data: data.body,
    });
  } catch (err) {
    if (isAxiosError(err)) {
      return err;
    } else {
      return err as Error;
    }
  }
}

/* eslint-disable react-refresh/only-export-components */
export const requestOptionsData = [
  // "Headers",
  "Body",
  // "Params",
  // "Cookies",
] as const;
export type RequestOptionsData = (typeof requestOptionsData)[number];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  const sendRequest = useCallback(async () => {
    // Set loading state
    dispatch({ type: "start/fetch" });

    // Retrieve the data
    const data = await fetchRequest({
      method: state.method,
      url: state.url,
      body: state.bodyJSON ? JSON.parse(state.bodyJSON) : {},
    });

    // Set the data
    if (isAxiosError(data)) {
      dispatch({ type: "set/error", payload: data });
    } else {
      dispatch({ type: "set/data", payload: data as AxiosResponse });
    }

    // Reset loading state
    dispatch({ type: "complete/fetch" });
  }, [state]);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch, sendRequest }}>
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
