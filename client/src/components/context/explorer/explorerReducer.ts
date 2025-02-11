import { Explorer } from "@/utils/Explorer";
import { ExplorerActions, ExplorerState } from "./explorerTypes";
import { v4 as getUUID } from "uuid";
import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";

export function reducers(
  state: ExplorerState,
  action: ExplorerActions
): ExplorerState {
  switch (action.type) {
    case "insert/group": {
      const newNodeId = getUUID();
      return {
        ...state,
        selectedId: newNodeId,
        tree: Explorer.insertNode(state.tree, action.payload.targetId, {
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
      const newNode: ExplorerTreeNode = {
        type: "request",
        httpMethod: "GET",
        id: getUUID(),
        title: "New Request",
      };
      const updatedTree = Explorer.insertNode(
        state.tree,
        action.payload.targetId,
        newNode
      );
      return {
        ...state,
        selectedId: newNode.id,
        currentWorkingDirectory: Explorer.getNodePath(updatedTree, newNode.id),
        history: [...state.history, newNode],
        tree: updatedTree,
      };
    }
    case "select/node": {
      const recentNode = Explorer.findNode(
        state.tree,
        action.payload.selectedId
      );
      const alreadyInHistory = state.history.find(
        (node) => node.id === recentNode?.id
      );
      return {
        ...state,
        selectedId: action.payload.selectedId,
        // Used to display the path trace / breadcrum on the workspace
        currentWorkingDirectory: Explorer.getNodePath(
          state.tree,
          action.payload.selectedId
        ),
        history:
          recentNode && !alreadyInHistory
            ? [...state.history, recentNode]
            : state.history,
      };
    }
    case "toggle/open":
      return {
        ...state,
        tree: Explorer.toggleNodeOpenState(
          state.tree,
          action.payload.selectedId
        ),
      };
    case "history/delete": {
      const newHistory = state.history.filter(
        (cur) => cur.id !== action.payload.id
      );
      // Check if the user deletes the current working directory
      const isCwd =
        action.payload.id === state.currentWorkingDirectory.at(-1)?.id;
      if (isCwd) {
        // Reassign the cwd to the right most history node
        const newSelectedNodeId = newHistory.at(-1)?.id;
        return {
          ...state,
          history: newHistory,
          selectedId: newSelectedNodeId,
          // If the history becomes empty after deletion, reset cwd back to []
          currentWorkingDirectory: newSelectedNodeId
            ? Explorer.getNodePath(state.tree, newSelectedNodeId)
            : [],
        };
      } else {
        return {
          ...state,
          history: newHistory,
        };
      }
    }
    case "history/push":
      return {
        ...state,
        history: [...state.history, action.payload.node],
      };

    default:
      throw new Error(`action not found`);
  }
}
