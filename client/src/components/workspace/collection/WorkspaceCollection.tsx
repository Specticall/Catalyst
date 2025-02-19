import { dialogs } from "@/App";
import { ExplorerTreeNode } from "@/components/sidebar/explorer/explorerTree";
import { useDialog } from "@/components/ui/Dialog";
import EditableText from "@/components/ui/EditableText";
import { HistoryNode } from "@/context/explorer/explorerTypes";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  activeCollectionNode: HistoryNode;
};

export type CookieDialogContext = {
  collectionNode: HistoryNode;
};

export default function WorkspaceCollection({ activeCollectionNode }: Props) {
  const { updateNodeName } = useExplorerManager();
  const dialog = useDialog<typeof dialogs>();
  return (
    <div className="" aria-label="collection-workspace-container">
      <div className="pb-6 px-8 border-b  border-border">
        <p className="text-secondary">Collection</p>
        <EditableText
          className="text-3xl mt-1 font-semibold w-fit"
          value={activeCollectionNode.title}
          onBlur={(value) => {
            updateNodeName(activeCollectionNode, value);
          }}
        />
      </div>
      <button
        className="text-white"
        onClick={() => {
          dialog.open("cookie", {
            collectionNode: activeCollectionNode,
          } satisfies CookieDialogContext);
        }}
      >
        SEE COOKIE
      </button>
    </div>
  );
}
