import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import { Request } from "@/utils/types";
import {
  WorkspaceAction,
  WorkspaceState,
} from "@/context/workspace/workspaceTypes";
import axios, {
  AxiosResponse,
  isAxiosError,
  RawAxiosRequestHeaders,
} from "axios";
import { useCallback } from "react";
import useRequestMutation from "../mutation/useRequestMutation";
import useExplorerMutation from "../mutation/useExplorerCreateMutation";
import { isValidJSON, safelyParseJSON } from "@/utils/lib";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
type RequestData = {
  method: Request["method"];
  url: Request["url"];
  body?: unknown;
  headers: Request["headers"];
};

async function fetchRequest(data: RequestData) {
  try {
    const method = data.method.toLowerCase();
    return await axios({
      method,
      url: data.url,
      data: data.body,
      headers: data.headers.reduce((res: Record<string, unknown>, cur) => {
        if (!cur.key) return res;
        if (cur.enabled) {
          res[cur.key] = cur.value;
        }
        return res;
      }, {}) as RawAxiosRequestHeaders,
    });
  } catch (err) {
    if (isAxiosError(err)) {
      return err;
    } else {
      return err as Error;
    }
  }
}

export default function useWorkspaceUpdater({
  dispatch,
  state,
}: {
  dispatch: React.ActionDispatch<[action: WorkspaceAction]>;
  state: WorkspaceState;
}) {
  const {
    state: { selectedId, tree },
    explorer,
  } = useExplorer();
  const { updateRequestMutation } = useRequestMutation();
  const { explorerUpdateMutation } = useExplorerMutation();
  const queryClient = useQueryClient();

  /**
   * Sends the request to the destination URL
   */
  const sendRequest = useCallback(async () => {
    // Check JSON validity for requets other than "GET" or "DELETE",
    // we're allowing invalid json to be sent because both request with these methods ignores the body in the first place
    const cannotHaveBody = ["GET", "DELETE"].includes(state.method);
    if (
      !cannotHaveBody &&
      state.bodyJSON !== "" &&
      !isValidJSON(state.bodyJSON)
    ) {
      dispatch({
        type: "change/body-error-message",
        payload: "Invalid JSON structure",
      });
      return;
    } else {
      dispatch({
        type: "change/body-error-message",
        payload: "",
      });
    }

    // Set loading state
    dispatch({ type: "start/fetch" });

    // Retrieve the data
    if (!state.headers) return;
    const data = (await fetchRequest({
      method: state.method,
      url: state.url,
      body: safelyParseJSON(state.bodyJSON),
      headers: state.headers,
    })) as AxiosResponse;

    // Set the data
    if (isAxiosError(data)) {
      dispatch({ type: "set/error", payload: data });
    } else {
      dispatch({ type: "set/data", payload: data });
    }

    // Reset loading state
    dispatch({ type: "complete/fetch" });

    const workspaceContainer = document.querySelector(
      "[data-workspace-container]"
    );
    dispatch({
      type: "set/previous-scroll-y",
      payload: (workspaceContainer?.scrollTop || 0) + `-${Math.random()}`,
    });
  }, [state, dispatch]);

  /**
   * Save the user's request state
   */
  const save = async () => {
    try {
      dispatch({ type: "change/is-saving", payload: true });
      if (!selectedId || !state.headers) return;
      const updateRequest = updateRequestMutation.mutateAsync({
        requestData: {
          body: state.bodyJSON,
          headers: state.headers,
          id: selectedId,
          method: state.method,
          name: "New Request",
          url: state.url,
        },
      });
      // Updates the explorer tree on save
      const updateExplorer = explorerUpdateMutation.mutate({ explorer: tree });
      await Promise.all([updateExplorer, updateRequest]);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST] });
    } catch (err) {
      console.log("Error saving workspace", err);
    } finally {
      dispatch({ type: "change/is-saving", payload: false });
    }
  };

  const changeMethod = useCallback(
    (method: HTTPMethods) => {
      if (!selectedId) return;
      dispatch({ type: "change/method", payload: method });
      explorer.update.method(selectedId, method);
    },
    [explorer, selectedId, dispatch]
  );

  return { changeMethod, save, sendRequest };
}
