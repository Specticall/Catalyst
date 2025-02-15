import EditableText from "@/components/ui/EditableText";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import { HistoryNode } from "@/context/explorer/explorerTypes";

type Props = {
  activeCollectionNode: HistoryNode;
};

export default function WorkspaceGroup({ activeCollectionNode }: Props) {
  const { explorer } = useExplorer();
  return (
    <div className="">
      <div className="pb-6 px-8 border-b  border-border">
        <p className="text-secondary">Group</p>
        <EditableText
          className="text-3xl mt-1 font-semibold w-fit"
          value={activeCollectionNode.title}
          onBlur={(value) =>
            explorer.update.name(activeCollectionNode.id, value)
          }
        />
      </div>
    </div>
  );
}
