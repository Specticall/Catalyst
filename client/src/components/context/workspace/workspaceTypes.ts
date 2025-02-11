import { HTTPMethods } from "@/components/sidebar/explorer/explorerTree";

export type WorkspaceState = {
  url: string;
  body: unknown;
  method: HTTPMethods;
};

export type WorkspaceAction =
  | {
      type: "change/url";
      payload: string;
    }
  | {
      type: "change/method";
      payload: HTTPMethods;
    };
