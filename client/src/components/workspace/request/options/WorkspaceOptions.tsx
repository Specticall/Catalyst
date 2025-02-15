import WorkspaceBodyEditor from "./body/WorkspaceBodyEditor";
import WorkspaceHeaders from "./header/WorkspaceHeaders";
import WorkspaceOptionsSelector from "./WorkspaceOptionsSelector";
import { useWorkspace } from "@/context/workspace/WorkspaceProvider";

export default function WorkspaceOptions() {
  const {
    state: { activeOption },
  } = useWorkspace();
  return (
    <>
      <WorkspaceOptionsSelector />
      <div className="min-h-[17.5rem] px-4 mt-4 ">
        {activeOption === "Body" && <WorkspaceBodyEditor />}
        {activeOption === "Headers" && <WorkspaceHeaders />}
      </div>
    </>
  );
}
