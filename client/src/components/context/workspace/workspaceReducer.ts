import { WorkspaceAction, WorkspaceState } from "./workspaceTypes";

export function reducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "change/method":
      return { ...state, method: action.payload };
    case "change/url":
      return {
        ...state,
        url: action.payload,
      };
    case "set/error": {
      return {
        ...state,
        error: action.payload,
        data: undefined,
      };
    }
    case "set/data": {
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };
    }
    case "complete/fetch": {
      return {
        ...state,
        isFetching: false,
      };
    }
    case "start/fetch": {
      return {
        ...state,
        isFetching: true,
      };
    }
    default:
      throw new Error("App not found");
  }
}
