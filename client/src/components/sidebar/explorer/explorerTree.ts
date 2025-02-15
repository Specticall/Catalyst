export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ExplorerTreeNodeCollection = {
  type: "collection";
  isOpen: boolean;
  title: string;
  children: ExplorerTreeNode[];
  id: string;
};

export type ExplorerTreeNodeGroup = {
  type: "group";
  isOpen: boolean;
  title: string;
  children: ExplorerTreeNode[];
  id: string;
};

export type ExplorerTreeNodeRequest = {
  type: "request";
  title: string;
  httpMethod: HTTPMethods;
  id: string;
};

export type ExplorerTreeNode =
  | ExplorerTreeNodeCollection
  | ExplorerTreeNodeGroup
  | ExplorerTreeNodeRequest;

export const contentTree: ExplorerTreeNode[] = [
  {
    type: "collection",
    isOpen: true,
    title: "Marketzid",
    id: "10",
    children: [
      {
        title: "Auth Endpoints",
        type: "group",
        isOpen: true,
        id: "11",
        children: [
          {
            type: "request",
            title: "Users",
            httpMethod: "GET",
            id: "1",
          },
          {
            type: "request",
            title: "Users",
            httpMethod: "PATCH",
            id: "18",
          },
          {
            type: "request",
            title: "Users",
            httpMethod: "POST",
            id: "2",
          },
          {
            type: "request",
            title: "Users",
            httpMethod: "PUT",
            id: "3",
          },
          {
            type: "request",
            title: "Users",
            httpMethod: "DELETE",
            id: "4",
          },
        ],
      },
      {
        title: "Analytics Endpoints",
        type: "group",
        isOpen: true,
        id: "15",
        children: [
          {
            type: "request",
            title: "Users",
            httpMethod: "GET",
            id: "5",
          },
          {
            type: "request",
            title: "Users",
            httpMethod: "POST",
            id: "6",
          },
        ],
      },
    ],
  },
  {
    type: "collection",
    isOpen: true,
    title: "Tjongklak",
    id: "12",
    children: [],
  },
];
