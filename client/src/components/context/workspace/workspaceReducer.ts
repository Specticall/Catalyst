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
    default:
      throw new Error("App not found");
  }
}
