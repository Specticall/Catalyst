import { dialogs } from "@/App";
import Button from "@/components/ui/Button";
import { useDialog } from "@/components/ui/Dialog";
import EditableText from "@/components/ui/EditableText";
import { HistoryNode } from "@/utils/types";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import { CookieDialogContext } from "@/hooks/managers/useRequestManager";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  activeCollectionNode: HistoryNode;
};

export default function WorkspaceCollection({ activeCollectionNode }: Props) {
  const { updateNodeName } = useExplorerManager();
  const dialog = useDialog<typeof dialogs>();
  return (
    <div className="" aria-label="collection-workspace-container">
      <div className="pb-6 px-8 border-b gap-x-5 grid grid-cols-[auto_1fr] items-center border-border">
        <p className="text-secondary col-span-2">Collection</p>
        <EditableText
          className="text-3xl mt-1 font-semibold w-fit"
          value={activeCollectionNode.title}
          onBlur={(value) => {
            updateNodeName(activeCollectionNode, value);
          }}
        />
        <Button
          variant={"hollow"}
          className="flex gap-2 py-1.5 px-4 rounded-full w-fit"
          onClick={() => {
            dialog.open("cookie", {
              collectionNode: activeCollectionNode,
            } satisfies CookieDialogContext);
          }}
        >
          <Icon
            icon="material-symbols:cookie-outline"
            className="text-xl text-secondary"
          />
          View Cookies
        </Button>
      </div>
    </div>
  );
}
