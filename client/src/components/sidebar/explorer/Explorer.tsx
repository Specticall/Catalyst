import { useContext, useReducer, createContext } from "react";
import { v4 as getUUID } from "uuid";
import { ExplorerTreeNode, contentTree } from "./explorerTree";
import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerHeader from "./ExplorerHeader";

export const INDENT_PX = 16;

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
    };

type ExplorerState = {
  tree: ExplorerTreeNode[];
  selectedId: string | undefined;
};

function reducers(
  state: ExplorerState,
  action: ExplorerActions
): ExplorerState {
  switch (action.type) {
    case "insert/group": {
      const newNodeId = getUUID();
      return {
        ...state,
        selectedId: newNodeId,
        tree: insertNode(state.tree, action.payload.targetId, {
          type: "group",
          id: newNodeId,
          isOpen: true,
          title: "New Group",
          children: [],
        }),
      };
    }
    case "insert/collection":
      return {
        ...state,
        tree: [
          ...state.tree,
          {
            type: "collection",
            id: getUUID(),
            isOpen: true,
            title: "New Collection",
            children: [],
          },
        ],
      };
    case "insert/request": {
      const newNodeId = getUUID();
      return {
        ...state,
        selectedId: newNodeId,
        tree: insertNode(state.tree, action.payload.targetId, {
          type: "request",
          httpMethod: "GET",
          id: newNodeId,
          title: "New Request",
        }),
      };
    }
    case "select/node":
      return {
        ...state,
        selectedId: action.payload.selectedId,
      };
    case "toggle/open":
      return {
        ...state,
        tree: toggleNodeOpenState(state.tree, action.payload.selectedId),
      };
    default:
      throw new Error(`action not found`);
  }
}

const initialState: ExplorerState = {
  tree: contentTree,
  selectedId: undefined,
};

/**
 * Toggles the `isOpen` state for a given node inside the tree
 */
function toggleNodeOpenState(
  nodes: ExplorerTreeNode[],
  id: string
): ExplorerTreeNode[] {
  return nodes.map((node) => {
    if (node.type === "request") {
      return node;
    }

    if (node.id === id) {
      return {
        ...node,
        isOpen: !node.isOpen,
      };
    }

    return {
      ...node,
      children: toggleNodeOpenState(node.children, id),
    };
  });
}

/**
 * Inserts the given `newNode` as the child of a node with id of `targetId`
 */
function insertNode(
  nodes: ExplorerTreeNode[],
  targetId: string,
  newNode: ExplorerTreeNode
): ExplorerTreeNode[] {
  return nodes.map((node) => {
    if (node.type === "request") return node;

    if (node.id === targetId) {
      return {
        ...node,
        children: [...node.children, newNode],
      };
    }

    return {
      ...node,
      children: insertNode(node.children, targetId, newNode),
    };
  });
}

const ExplorerContext = createContext<{
  state: ExplorerState;
  dispatch: React.ActionDispatch<[action: ExplorerActions]>;
} | null>(null);

export default function Explorer() {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <ExplorerContext.Provider value={{ state, dispatch }}>
      <ExplorerHeader />
      <div className="mt-4">
        <RecursiveExplorerTree
          dispatch={dispatch}
          selectedId={state.selectedId}
          content={state.tree}
          depth={0}
        />
      </div>
    </ExplorerContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useExplorer() {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error("useExplorer must be used inside of it's Provider's scope");
  return context;
}
