import WorkspaceBodyEditor from "./body/WorkspaceBodyEditor";
import WorkspaceOptionsSelector from "./WorkspaceOptionsSelector";
import { useWorkspace } from "@/components/context/workspace/WorkspaceProvider";

export default function WorkspaceOptions() {
  const {
    state: { activeOption },
  } = useWorkspace();
  return (
    <>
      <WorkspaceOptionsSelector />
      <div className="min-h-[17.5rem] px-4 mt-4 ">
        {activeOption === "Body" && <WorkspaceBodyEditor />}
      </div>
    </>
  );
}
