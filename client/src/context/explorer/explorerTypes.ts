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
        updatedTree: ExplorerTreeNode[];
        newNode: ExplorerTreeNodeRequest;
      };
    }
  | {
      type: "insert/collection";
      payload: ExplorerTreeNode[];
    }
  | {
      type: "insert/group";
      payload: ExplorerTreeNode[];
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
    }
  | {
      type: "load/tree";
      payload: ExplorerTreeNode[];
    }
  | {
      type: "change/method";
      payload: { newTree: ExplorerTreeNode[]; newHistory: HistoryNode[] };
    }
  | {
      /**
       * Updates everyhing related to the tree, explorer, history, request and cwd, used for global modification like http method change and name change
       */
      type: "update/tree/all";
      payload: { newTree: ExplorerTreeNode[]; newHistory: HistoryNode[] };
    }
  | {
      type: "insert/tree/all";
      payload: {
        newTree: ExplorerTreeNode[];
        newNode: HistoryNode;
        newHistory: HistoryNode[];
      };
    };

export type ExplorerState = {
  tree: ExplorerTreeNode[];
  selectedId: string | undefined;
  history: HistoryNode[];
  currentWorkingDirectory: HistoryNode[];
};
