import WorkspaceOptions from "./request/options/WorkspaceOptions";
import WorkspaceURLInput from "./request/WorkspaceURLInput";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import WorkspaceGroup from "./group/WorkspaceGroup";
import WorkspaceCollection from "./collection/WorkspaceCollection";
import WorkspaceResponse from "./response/WorkspaceResponse";

export default function Workspace() {
  const { state } = useExplorer();
  const activeNode = state.currentWorkingDirectory.at(-1);

  if (!activeNode) {
    return <div></div>;
  }

  if (activeNode.type === "group") {
    return <WorkspaceGroup activeCollectionNode={activeNode} />;
  }

  if (activeNode.type === "collection") {
    return <WorkspaceCollection activeCollectionNode={activeNode} />;
  }

  return (
    <>
      <WorkspaceURLInput />
      <WorkspaceOptions />
      <WorkspaceResponse />
    </>
  );
}
