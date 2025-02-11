import { cn } from "@/utils/lib";
import { ExplorerTreeNode } from "./explorerTree";
import GroupNode from "./GroupNode";
import CollectionNode from "./CollectionNode";
import { ExplorerActions } from "@/components/context/explorer/explorerTypes";
import RequestNode from "./RequestNode";

const INDENT_PX = 16;

export function RecursiveExplorerTree({
  depth = 0,
  content,
  dispatch,
  selectedId,
}: {
  depth: number;
  content: ExplorerTreeNode[];
  dispatch: React.ActionDispatch<[action: ExplorerActions]>;
  selectedId?: string;
}) {
  // Sets the element indent based on the traversal depth
  const indentStyle = { paddingLeft: `${INDENT_PX * depth}px` };

  return content?.map((node) => {
    // Renders request files (which are bottom nodes)
    if (node.type === "request") {
      return <RequestNode indentStyle={indentStyle} node={node} />;
    }

    return (
      <>
        {/* Current node */}
        {node.type === "group" ? (
          <GroupNode node={node} indentStyle={indentStyle} />
        ) : (
          <CollectionNode node={node} indentStyle={indentStyle} />
        )}
        {/* Recursive node */}
        <div
          className={cn(
            "grid transition-all duration-300",
            node.isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <RecursiveExplorerTree
              dispatch={dispatch}
              content={node.children}
              selectedId={selectedId}
              depth={depth + 1}
            />
          </div>
        </div>
      </>
    );
  });
}
