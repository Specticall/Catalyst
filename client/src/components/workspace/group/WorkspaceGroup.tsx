import EditableText from "@/components/ui/EditableText";
import { HistoryNode } from "@/utils/types";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  activeCollectionNode: HistoryNode;
};

export default function WorkspaceGroup({ activeCollectionNode }: Props) {
  const { updateNodeName } = useExplorerManager();
  return (
    <div aria-label="group-workspace-container" className="">
      <div className="pb-6 px-8 border-b  border-border">
        <p className="text-secondary">Group</p>
        <EditableText
          className="text-3xl mt-1 font-semibold w-fit"
          value={activeCollectionNode.title}
          onBlur={(value) => {
            updateNodeName(activeCollectionNode, value);
          }}
        />
      </div>
    </div>
  );
}
