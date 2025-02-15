import WorkspaceOptions from "./request/options/WorkspaceOptions";
import WorkspaceURLInput from "./request/WorkspaceURLInput";
import WorkspaceGroup from "./group/WorkspaceGroup";
import WorkspaceCollection from "./collection/WorkspaceCollection";
import WorkspaceResponse from "./response/WorkspaceResponse";
import useExplorerHistoryStore from "@/stores/explorerHistoryStore";

export default function Workspace() {
  const { selectedNode } = useExplorerHistoryStore();

  if (!selectedNode) {
    return <div></div>;
  }

  if (selectedNode.type === "group") {
    return <WorkspaceGroup activeCollectionNode={selectedNode} />;
  }

  if (selectedNode.type === "collection") {
    return <WorkspaceCollection activeCollectionNode={selectedNode} />;
  }

  return (
    <div aria-label="request-workspace-container">
      <WorkspaceURLInput />
      <WorkspaceOptions />
      <WorkspaceResponse />
    </div>
  );
}
