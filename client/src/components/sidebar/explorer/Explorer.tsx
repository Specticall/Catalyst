import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerLoader from "./ExplorerLoader";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";
import { Icon } from "@iconify/react/dist/iconify.js";

export const INDENT_PX = 12;

export default function Explorer() {
  const explorerManager = useExplorerManager();
  const { data, isLoading } = useWorkspaceQuery();
  const explorerIsEmpty = data && data.explorer.length === 0;

  if (isLoading) {
    return <ExplorerLoader />;
  }
  if (!data || explorerIsEmpty) {
    return (
      <div className="mt-4 flex-1 flex items-center justify-center py-4 min-h-16 flex-col">
        <div className="bg-border/75 rounded-full p-8">
          <Icon
            icon={"system-uicons:box-open"}
            className="text-[5rem] text-base"
          />
        </div>
        <p className="text-secondary/80 text-lg mt-4">Explorer is Empty</p>
      </div>
    );
  }

  return (
    <div className="mt-4 relative flex-1 overflow-y-auto mb-4">
      <div className="absolute inset-0">
        <RecursiveExplorerTree
          explorerManager={explorerManager}
          selectedId={explorerManager.selectedNode?.id}
          content={data.explorer}
          depth={0}
        />
      </div>
    </div>
  );
}
