import {
  ExplorerTreeNode,
  HTTPMethods,
} from "@/components/sidebar/explorer/explorerTree";

export type SuccessReponse<T> = {
  message: string;
  data: T;
};

export type Workspace = {
  name: string;
  id: number;
  explorer: ExplorerTreeNode[];
};

export type Request = {
  body: string;
  headers: {
    value: string;
    key: string;
    enabled: boolean;
    id: string;
  }[];
  id: string;
  method: HTTPMethods;
  name: string;
  url: string;
};
