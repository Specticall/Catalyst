import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";
import { AxiosError, AxiosResponse } from "axios";
import { RequestOptionsData } from "./WorkspaceProvider";

export type WorkspaceState = {
  url: string;
  bodyJSON: string;
  method: HTTPMethods;
  error?: AxiosError;
  data?: AxiosResponse;
  isFetching: boolean;
  activeOption: RequestOptionsData;
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
  | { type: "change/options"; payload: RequestOptionsData };
