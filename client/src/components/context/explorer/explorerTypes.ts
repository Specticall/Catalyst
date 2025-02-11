import {
  ExplorerTreeNode,
  ExplorerTreeNodeCollection,
  ExplorerTreeNodeGroup,
  ExplorerTreeNodeRequest,
} from "@/components/sidebar/explorer/explorerTree";

export type HistoryNode =
  | Omit<ExplorerTreeNodeCollection, "children">
  | Omit<ExplorerTreeNodeGroup, "children">
  | ExplorerTreeNodeRequest;

export type ExplorerActions =
  | {
      type: "insert/request";
      payload: {
        targetId: string;
      };
    }
  | {
      type: "insert/collection";
    }
  | {
      type: "insert/group";
      payload: {
        targetId: string;
      };
    }
  | {
      type: "toggle/open";
      payload: {
        selectedId: string;
      };
    }
  | {
      type: "select/node";
      payload: {
        selectedId: string;
      };
    }
  | {
      type: "history/push";
      payload: {
        node: ExplorerTreeNode;
      };
    }
  | {
      type: "history/delete";
      payload: { id: string };
    };

export type ExplorerState = {
  tree: ExplorerTreeNode[];
  selectedId: string | undefined;
  history: HistoryNode[];
  currentWorkingDirectory: HistoryNode[];
};
