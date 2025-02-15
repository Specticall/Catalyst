import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerHeader from "./ExplorerHeader";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import ExplorerLoader from "./ExplorerLoader";

export const INDENT_PX = 16;

export default function Explorer() {
  const { state, dispatch, isLoadingTree } = useExplorer();
  return (
    <>
      <ExplorerHeader />
      {isLoadingTree && <ExplorerLoader />}
      <div className="mt-4 relative flex-1 overflow-y-auto">
        <div className="absolute inset-0 ">
          <RecursiveExplorerTree
            dispatch={dispatch}
            selectedId={state.selectedId}
            content={state.tree}
            depth={0}
          />
        </div>
      </div>
    </>
  );
}
