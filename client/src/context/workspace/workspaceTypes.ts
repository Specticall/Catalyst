import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";
import { AxiosError, AxiosResponse } from "axios";
import { RequestOptionsData } from "./WorkspaceProvider";
import { Request } from "@/utils/types";

export type WorkspaceState = {
  url: Request["url"];
  method: Request["method"];
  headers?: Request["headers"];
  bodyJSON: string;
  data?: AxiosResponse;
  error?: AxiosError;
  isFetching: boolean;
  activeOption: RequestOptionsData;
  bodyErrorMessage: string;
  isSaving: boolean;

  prevWorkspaceContainerScrollY: string;
};

export type WorkspaceAction =
  | {
      type: "change/url";
      payload: string;
    }
  | {
      type: "change/method";
      payload: HTTPMethods;
    }
  | { type: "set/error"; payload: AxiosError }
  | { type: "set/data"; payload: AxiosResponse }
  | { type: "start/fetch" }
  | { type: "complete/fetch" }
  | { type: "change/body"; payload: string }
  | { type: "change/options"; payload: RequestOptionsData }
  | { type: "change/is-saving"; payload: boolean }
  | { type: "change/body-error-message"; payload: string }
  | { type: "load/data"; payload: Request }
  | { type: "set/header"; payload: Record<string, unknown> }
  | {
      type: "update/headers";
      payload:
        | {
            target: "key" | "value";
            id: string;
            newValue: string;
          }
        | {
            target: "enabled";
            id: string;
            newValue: boolean;
          };
    }
  | {
      type: "insert/headers";
      payload: { key?: string; value?: string };
    }
  | { type: "set/previous-scroll-y"; payload: string };
