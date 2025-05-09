import {
  ExplorerTreeNode,
  ExplorerTreeNodeCollection,
  ExplorerTreeNodeGroup,
  ExplorerTreeNodeRequest,
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
  cookies: string[];
};
export type ProxyServerResponse =
  | {
      size: number;
      statusCode: number | undefined;
      statusMessage: string;
      data: unknown;
      errorMessage?: string;
    }
  | undefined;

type SameSite = "Lax" | "None" | "Strict";

export type Cookie = {
  id: number;
  domain: string;
  path: string;
  name: string;
  value: string;
  expiration?: Date;
  maxAge?: number;
  secure: boolean;
  httpOnly: boolean;
  sameSite?: SameSite;
  collectionId: string;
};

export type WorkspaceRole = "owner" | "viewer" | "editor";

export type WorkspacePreview = {
  name: string;
  id: number;
  role: WorkspaceRole;
  userWorkspaceId: number;
  profilePictures: string[];
};

export type User = {
  username: string;
  email: string;
  profilePicture: string;
  id: number;
};

export type WorkspaceMembers = User & {
  role: WorkspaceRole;
  isPendingInvite: boolean;
};
export type HistoryNode =
  | Omit<ExplorerTreeNodeCollection, "children">
  | Omit<ExplorerTreeNodeGroup, "children">
  | ExplorerTreeNodeRequest;
