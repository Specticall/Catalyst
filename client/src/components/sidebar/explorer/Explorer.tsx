import { RecursiveExplorerTree } from "./RecursiveExplorerTree";
import ExplorerHeader from "./ExplorerHeader";
import { useExplorer } from "@/components/context/explorer/ExplorerProvider";

export const INDENT_PX = 16;

export default function Explorer() {
  const { state, dispatch } = useExplorer();
  return (
    <>
      <ExplorerHeader />
      <div className="mt-4">
        <RecursiveExplorerTree
          dispatch={dispatch}
          selectedId={state.selectedId}
          content={state.tree}
          depth={0}
        />
      </div>
    </>
  );
}
