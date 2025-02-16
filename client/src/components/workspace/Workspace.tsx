import WorkspaceGroup from "./group/WorkspaceGroup";
import WorkspaceCollection from "./collection/WorkspaceCollection";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import WorkspaceRequest from "./request/options/WorkspaceRequest";

export default function Workspace() {
  const { selectedNode } = useExplorerManager();

  if (!selectedNode) {
    return <div></div>;
  }

  if (selectedNode.type === "group") {
    return <WorkspaceGroup activeCollectionNode={selectedNode} />;
  }

  if (selectedNode.type === "collection") {
    return <WorkspaceCollection activeCollectionNode={selectedNode} />;
  }

  return <WorkspaceRequest />;
}
