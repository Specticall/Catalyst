import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import { ExplorerTreeNodeGroup } from "./explorerTree";
import { cn } from "@/utils/lib";
import NodeOptionsPopover from "./NodeOptionsPopover";
import NodeOpenStateToggler from "./NodeOpenStateToggler";

type Props = {
  node: ExplorerTreeNodeGroup;
  indentStyle: React.CSSProperties;
};

export default function GroupNode({ node, indentStyle }: Props) {
  const {
    dispatch,
    state: { selectedId },
  } = useExplorer();

  return (
    <div
      aria-label="group-node"
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (element.closest(".ignore-click")) return;
        dispatch({
          type: "select/node",
          payload: { selectedId: node.id },
        });
      }}
      style={indentStyle}
      className={cn(
        "group text-primary mb-2 py-1.5 cursor-pointer flex items-center w-full transition-all duration-100 rounded-md pr-2",
        selectedId === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <NodeOpenStateToggler
        node={node}
        onClick={() => {
          dispatch({
            type: "toggle/open",
            payload: { selectedId: node.id },
          });
        }}
      />

      <Icon icon={"material-symbols:folder-outline"} className="text-xl mr-3" />

      {node.title}
      <div className="flex justify-end items-center flex-1 opacity-0 group-hover:opacity-100 transition duration-200">
        <NodeOptionsPopover currentNodeId={node.id} />
      </div>
    </div>
  );
}
