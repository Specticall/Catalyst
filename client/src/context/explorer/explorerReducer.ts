import { Explorer } from "@/utils/Explorer";
import { ExplorerActions, ExplorerState } from "./explorerTypes";
import { v4 as getUUID } from "uuid";

/**
 * Note: explorer update logic have been extracted into `useExplorerUpdater` read the comment for more details.
 */
export function reducers(
  state: ExplorerState,
  action: ExplorerActions
): ExplorerState {
  switch (action.type) {
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
    case "load/tree":
      return {
        ...state,
        tree: action.payload,
      };
    case "update/tree/all":
      return {
        ...state,
        currentWorkingDirectory: state.selectedId
          ? Explorer.getNodePath(action.payload.newTree, state.selectedId)
          : state.currentWorkingDirectory,
        tree: action.payload.newTree,
        history: action.payload.newHistory,
      };
    case "insert/tree/all": {
      const newNode = action.payload.newNode;
      const newTree = action.payload.newTree;

      return {
        ...state,
        selectedId: newNode.id,
        currentWorkingDirectory: Explorer.getNodePath(newTree, newNode.id),
        history: action.payload.newHistory,
        tree: newTree,
      };
    }

    default:
      throw new Error(`action not found`);
  }
}
