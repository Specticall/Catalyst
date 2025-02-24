import {
  ExplorerTreeNode,
  HTTPMethods,
} from "@/components/sidebar/explorer/explorerTree";
import { HistoryNode } from "./types";

export class Explorer {
  /**
   * Searches for a node with `targetId` inside the file tree
   */
  static findNode(
    nodes: ExplorerTreeNode[],
    targetId: string
  ): ExplorerTreeNode | undefined {
    for (const node of nodes) {
      if (node.id === targetId) {
        return node;
      }
      if (node.type !== "request") {
        const found = this.findNode(node.children, targetId);
        if (found) return found;
      }
    }
    return undefined;
  }

  /**
   * Toggles the `isOpen` state for a given node inside the tree
   */
  static toggleNodeOpenState(
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
        children: this.toggleNodeOpenState(node.children, id),
      };
    });
  }

  /**
   * Inserts the given `newNode` as the child of a node with id of `targetId`
   */
  static insertNode(
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
        children: this.insertNode(node.children, targetId, newNode),
      };
    });
  }

  /**
   * Deletes node from the given tree
   */
  static popNode(
    nodes: ExplorerTreeNode[],
    targetId: string
  ): ExplorerTreeNode[] {
    return nodes
      .map((node) => {
        if (node.id === targetId) {
          return null;
        }

        if (node.type === "request") {
          return node;
        }

        return {
          ...node,
          children: this.popNode(node.children, targetId),
        };
      })
      .filter((node) => node !== null);
  }

  /**
   * Finds an element and return the path to get to it, used to path in workspace
   */
  static getNodePath(nodes: ExplorerTreeNode[], targetId: string) {
    const stack: ExplorerTreeNode[] = [];

    this.traverseNodePath(nodes, targetId, stack);
    return stack;
  }
  private static traverseNodePath(
    nodes: ExplorerTreeNode[],
    targetId: string,
    stack: ExplorerTreeNode[]
  ): boolean {
    for (const node of nodes) {
      stack.push(node);
      if (node.id === targetId) {
        return true;
      }

      if (node.type !== "request") {
        const found = this.traverseNodePath(node.children, targetId, stack);
        if (found) return true;
      }

      stack.pop();
    }

    return false;
  }

  static changeNodeMethod(
    nodes: ExplorerTreeNode[],
    targetId: string,
    method: HTTPMethods
  ): ExplorerTreeNode[] {
    return nodes.map((node) => {
      if (node.type === "request" && node.id === targetId) {
        return {
          ...node,
          httpMethod: method,
        };
      }

      if (node.type !== "request") {
        return {
          ...node,
          children: this.changeNodeMethod(node.children, targetId, method),
        };
      }

      return node;
    });
  }

  static changeNodeName(
    nodes: ExplorerTreeNode[],
    targetId: string,
    newName: string
  ): ExplorerTreeNode[] {
    return nodes.map((node) => {
      if (node.id === targetId) {
        return {
          ...node,
          title: newName,
        };
      }

      if (node.type === "request") {
        return node;
      }

      return {
        ...node,
        children: this.changeNodeName(node.children, targetId, newName),
      };
    });
  }

  /**
   * Deletes any history nodes that no longer exists in the tree, this is called after a deletion of a grouped node (e.g. deleted a group with 4 requests in it), in which all the child no longer exists thus needs to be validated again.
   */
  static trimHistoryNodes(nodes: ExplorerTreeNode[], history: HistoryNode[]) {
    const newHistory: HistoryNode[] = [];
    const historySet = new Set(history.map((h) => h.id));

    function traverse(nodes: ExplorerTreeNode[]) {
      for (const node of nodes) {
        if (historySet.has(node.id)) {
          newHistory.push(history.find((h) => h.id === node.id)!);
        }
        if (node.type !== "request" && node.children) {
          traverse(node.children);
        }
      }
    }
    traverse(nodes);
    return newHistory;
  }

  static traverseAllNodes(nodes: ExplorerTreeNode[]): ExplorerTreeNode[] {
    const res: ExplorerTreeNode[] = [];
    for (const node of nodes) {
      res.push(node);
      if (node.type !== "request" && node.children) {
        res.push(...this.traverseAllNodes(node.children));
      }
    }
    return res;
  }

  static findCollectionParent(
    nodes: ExplorerTreeNode[],
    targetId: string
  ): ExplorerTreeNode | undefined {
    if (nodes.length <= 0) return undefined;
    let candidate: ExplorerTreeNode | undefined;

    function traverse(nodes: ExplorerTreeNode[]) {
      for (const node of nodes) {
        if (node.type === "collection" && node.children) {
          candidate = node;
          if (traverse(node.children)) {
            return true;
          }
          candidate = undefined;
        } else if (node.id === targetId) {
          return true;
        } else if (node.type !== "request" && node.children) {
          if (traverse(node.children)) {
            return true;
          }
        }
      }
      return false;
    }
    traverse(nodes);

    return candidate;
  }

  static findMany(nodes: ExplorerTreeNode[], query: string) {
    const results: ExplorerTreeNode[] = [];
    function traverse(nodes: ExplorerTreeNode[]) {
      for (const node of nodes) {
        if (node.title.toLowerCase().includes(query.toLowerCase())) {
          results.push(node);
        }
        if (node.type !== "request" && node.children) {
          traverse(node.children);
        }
      }
    }
    traverse(nodes);

    return results;
  }
}
