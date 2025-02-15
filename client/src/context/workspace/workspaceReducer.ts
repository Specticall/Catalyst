import { v4 } from "uuid";
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
    case "set/header":
      return {
        ...state,
      };
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
    case "change/body": {
      return {
        ...state,
        bodyJSON: action.payload,
      };
    }
    case "change/options": {
      return {
        ...state,
        activeOption: action.payload,
      };
    }
    case "load/data": {
      return {
        ...state,
        bodyJSON: action.payload.body,
        activeOption: "Body",
        method: action.payload.method,
        url: action.payload.url,
        headers: action.payload.headers,
      };
    }
    case "change/is-saving": {
      return {
        ...state,
        isSaving: action.payload,
      };
    }
    case "change/body-error-message": {
      return {
        ...state,
        bodyErrorMessage: action.payload,
      };
    }
    case "update/headers":
      return {
        ...state,
        headers: state.headers?.map((header) => {
          return header.id === action.payload.id
            ? { ...header, [action.payload.target]: action.payload.newValue }
            : header;
        }),
      };
    case "insert/headers":
      return {
        ...state,
        headers: [
          ...(state?.headers || []),
          {
            key: action.payload.key || "",
            value: action.payload.value || "",
            enabled: false,
            id: v4(),
          },
        ],
      };
    case "set/previous-scroll-y":
      return {
        ...state,
        prevWorkspaceContainerScrollY: action.payload,
      };
    default:
      throw new Error("Reducer action not found");
  }
}
