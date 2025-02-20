import { Icon } from "@iconify/react/dist/iconify.js";
import { ExplorerTreeNodeGroup } from "./explorerTree";
import { cn } from "@/utils/lib";
import NodeOptionsPopover from "./NodeOptionsPopover";
import NodeOpenStateToggler from "./NodeOpenStateToggler";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  node: ExplorerTreeNodeGroup;
};

export default function GroupNode({ node }: Props) {
  const { toggleOpenState, selectNode, selectedNode } = useExplorerManager();
  return (
    <div
      aria-label="group-node"
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (element.closest(".ignore-click")) return;
        selectNode(node);
      }}
      className={cn(
        " text-primary py-1.5 cursor-pointer flex items-center w-full transition-all duration-100 rounded-md pr-2",
        selectedNode?.id === node.id ? "bg-highlight" : "hover:bg-highlight/30"
      )}
    >
      <NodeOpenStateToggler
        node={node}
        onClick={() => toggleOpenState(node.id)}
      />

      <Icon icon={"material-symbols:folder-outline"} className="text-xl mr-3" />

      {node.title}
      <div className="flex justify-end items-center flex-1">
        <NodeOptionsPopover currentNodeId={node.id} />
      </div>
    </div>
  );
}
