import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useExplorer } from "./Explorer";
import { ExplorerTreeNodeGroup } from "./explorerTree";
import { cn } from "@/utils/lib";
import NewNodePopover from "./NewNodePopover";

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
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (element.closest(".ignore-click")) return;
        dispatch({
          type: "toggle/open",
          payload: { selectedId: node.id },
        });
        dispatch({
          type: "select/node",
          payload: { selectedId: node.id },
        });
      }}
      style={indentStyle}
      className={cn(
        "group text-primary mb-2 py-1.5 cursor-pointer flex gap-3 items-center w-full transition-all duration-100 rounded-md pr-2",
        selectedId === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <Icon
        icon={"mdi:chevron-down"}
        className={cn(
          "text-xl transition-all duration-300",
          !node.isOpen && "-rotate-90"
        )}
      />
      <Icon icon={"material-symbols:folder-outline"} className="text-xl" />

      {node.title}
      <div className="flex justify-end items-center flex-1 opacity-0 group-hover:opacity-100 transition duration-200">
        <NewNodePopover currentNodeId={node.id} />
      </div>
    </div>
  );
}
