import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";
import { AxiosError, AxiosResponse } from "axios";

export type WorkspaceState = {
  url: string;
  body: unknown;
  method: HTTPMethods;
  error?: AxiosError;
  data?: AxiosResponse;
  isFetching: boolean;
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
  | { type: "complete/fetch" };
