import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { ExplorerTreeNodeCollection } from "./explorerTree";
import { cn } from "@/utils/lib";
import NodeOptionsPopover from "./NodeOptionsPopover";
import NodeOpenStateToggler from "./NodeOpenStateToggler";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  node: ExplorerTreeNodeCollection;
  indentStyle: React.CSSProperties;
};

export default function CollectionNode({ node, indentStyle }: Props) {
  const { toggleOpenState, selectNode, selectedNode } = useExplorerManager();

  return (
    <div
      aria-label="collection-node"
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (element.closest(".ignore-click")) return;
        selectNode(node);
      }}
      style={indentStyle}
      className={cn(
        "group text-primary mb-2 cursor-pointer flex items-center w-full transition-all duration-100 rounded-md pr-2",
        selectedNode?.id === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <NodeOpenStateToggler
        node={node}
        onClick={() => toggleOpenState(node.id)}
      />

      <div className="border border-border rounded-sm p-2 mr-3">
        <Icon icon={"bx:collection"} className="text-xl" />
      </div>
      {node.title}
      <div className="flex-1 flex justify-end opacity-0 group-hover:opacity-100 transition duration-200">
        <NodeOptionsPopover currentNodeId={node.id} />
      </div>
    </div>
  );
}
