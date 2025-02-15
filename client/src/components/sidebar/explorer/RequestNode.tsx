import { cn } from "@/utils/lib";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import { ExplorerTreeNodeRequest } from "./explorerTree";
import HTTPMethodBadge from "@/components/ui/HTTPMethodBadge";

type Props = {
  node: ExplorerTreeNodeRequest;
  indentStyle: React.CSSProperties;
};

export default function RequestNode({ node, indentStyle }: Props) {
  const {
    dispatch,
    state: { selectedId },
  } = useExplorer();
  return (
    <div
      aria-label="request-node"
      onClick={() => {
        dispatch({
          type: "select/node",
          payload: { selectedId: node.id },
        });
      }}
      style={{
        paddingLeft: `${parseInt(indentStyle?.paddingLeft as string) + 14}px`,
      }}
      className={cn(
        "text-primary flex items-center gap-2 mb-1 py-1.5 rounded-md cursor-pointer transition-all duration-100",
        selectedId === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <HTTPMethodBadge method={node.httpMethod} />
      {node.title}
    </div>
  );
}
