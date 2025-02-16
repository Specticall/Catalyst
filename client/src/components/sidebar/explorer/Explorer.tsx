import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerLoader from "./ExplorerLoader";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";

export const INDENT_PX = 16;

export default function Explorer() {
  const explorerManager = useExplorerManager();
  const { data, isPending } = useWorkspaceQuery();

  if (!data || isPending) {
    return <ExplorerLoader />;
  }

  return (
    <div className="mt-4 relative flex-1 overflow-y-auto">
      <div className="absolute inset-0 ">
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
