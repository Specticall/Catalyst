import { cn } from "@/utils/lib";
import { ExplorerTreeNodeRequest } from "./explorerTree";
import HTTPMethodBadge from "@/components/ui/HTTPMethodBadge";
import useExplorerHistoryStore from "@/stores/explorerHistoryStore";
import useExplorerManager from "@/hooks/useExplorerManager";

type Props = {
  node: ExplorerTreeNodeRequest;
  indentStyle: React.CSSProperties;
};

export default function RequestNode({ node, indentStyle }: Props) {
  const { selectedNode } = useExplorerHistoryStore();
  const { selectNode } = useExplorerManager();
  return (
    <div
      aria-label="request-node"
      onClick={() => selectNode(node)}
      style={{
        paddingLeft: `${parseInt(indentStyle?.paddingLeft as string) + 14}px`,
      }}
      className={cn(
        "text-primary flex items-center gap-2 mb-1 py-1.5 rounded-md cursor-pointer transition-all duration-100",
        selectedNode?.id === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <HTTPMethodBadge method={node.httpMethod} />
      {node.title}
    </div>
  );
}
