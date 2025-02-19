import { cn } from "@/utils/lib";
import { ExplorerTreeNodeRequest } from "./explorerTree";
import HTTPMethodBadge from "@/components/ui/HTTPMethodBadge";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import NodeOptionsPopoverRequest from "./NodeOptionsPopoverRequest";

type Props = {
  node: ExplorerTreeNodeRequest;
  indentStyle: React.CSSProperties;
};

export default function RequestNode({ node, indentStyle }: Props) {
  const { selectNode, selectedNode } = useExplorerManager();
  return (
    <div
      aria-label="request-node"
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (element.closest(".ignore-click")) return;
        selectNode(node);
      }}
      style={{
        paddingLeft: `${parseInt(indentStyle?.paddingLeft as string) + 14}px`,
      }}
      className={cn(
        "text-primary flex items-center gap-2 mb-1 py-1.5 rounded-md cursor-pointer transition-all duration-100 pr-2",
        selectedNode?.id === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <HTTPMethodBadge method={node.httpMethod} />
      {node.title}
      <div className="flex-1 flex justify-end">
        <NodeOptionsPopoverRequest currentNodeId={node.id} />
      </div>
    </div>
  );
}
