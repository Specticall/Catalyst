import { cn } from "@/utils/lib";
import { ExplorerTreeNode } from "./explorerTree";
import GroupNode from "./GroupNode";
import CollectionNode from "./CollectionNode";
import RequestNode from "./RequestNode";
import React from "react";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

const INDENT_PX = 24;

export function RecursiveExplorerTree({
  depth = 0,
  content,
  explorerManager,
  selectedId,
}: {
  depth: number;
  content: ExplorerTreeNode[];
  explorerManager: ReturnType<typeof useExplorerManager>;
  selectedId?: string;
}) {
  return content?.map((node, i) => {
    // Renders request files (which are bottom nodes)
    if (node.type === "request") {
      return <RequestNode node={node} key={i} />;
    }

    return (
      <React.Fragment key={i}>
        {/* Current node */}
        {node.type === "group" ? (
          <GroupNode node={node} />
        ) : (
          <CollectionNode node={node} />
        )}
        {/* Recursive node */}
        <div
          className={cn(
            "grid transition-all duration-300",
            node.isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
          aria-label="explorer-children-container"
        >
          <div className="overflow-hidden pl-[15px]">
            <div className=" border-l grid gap-1 border-border w-full pl-2">
              <RecursiveExplorerTree
                explorerManager={explorerManager}
                content={node.children}
                selectedId={selectedId}
                depth={depth + 1}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
}
