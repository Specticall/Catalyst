import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerLoader from "./ExplorerLoader";
import useExplorerManager from "@/hooks/useExplorerManager";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";
import useExplorerHistoryStore from "@/stores/explorerHistoryStore";

export const INDENT_PX = 16;

export default function Explorer() {
  const explorerManager = useExplorerManager();
  const { data, isPending } = useWorkspaceQuery();
  const { selectedId } = useExplorerHistoryStore();

  if (!data || isPending) {
    return <ExplorerLoader />;
  }

  return (
    <div className="mt-4 relative flex-1 overflow-y-auto">
      <div className="absolute inset-0 ">
        <RecursiveExplorerTree
          explorerManager={explorerManager}
          selectedId={selectedId}
          content={data.explorer}
          depth={0}
        />
      </div>
    </div>
  );
}
