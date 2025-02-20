import WorkspaceGroup from "./group/WorkspaceGroup";
import WorkspaceCollection from "./collection/WorkspaceCollection";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import WorkspaceRequest from "./request/options/WorkspaceRequest";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Workspace() {
  const { selectedNode } = useExplorerManager();

  if (!selectedNode) {
    return (
      <div className="flex mt-13 p-12  items-center justify-center h-full w-full flex-col">
        <div className="bg-highlight rounded-full w-64 aspect-square flex items-center justify-center">
          <Icon icon={"ion:rocket-sharp"} className="text-[9rem] text-base" />
        </div>
        <h2 className="text-white text-2xl mt-10">No Request Selected</h2>
        <p className="text-secondary max-w-[20rem] text-center mt-4">
          Click the add button on the explorer or select a request to get
          started
        </p>
      </div>
    );
  }

  if (selectedNode.type === "group") {
    return <WorkspaceGroup activeCollectionNode={selectedNode} />;
  }

  if (selectedNode.type === "collection") {
    return <WorkspaceCollection activeCollectionNode={selectedNode} />;
  }

  return <WorkspaceRequest />;
}
