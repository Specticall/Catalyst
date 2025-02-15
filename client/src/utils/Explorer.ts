import {
  ExplorerTreeNode,
  HTTPMethods,
} from "@/components/sidebar/explorer/explorerTree";

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
}
