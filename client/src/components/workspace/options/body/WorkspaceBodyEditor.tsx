import "@/css/jsoneditor.css";
import WorkspaceBodyOptsPopover from "./WorkspaceBodyOptsPopover";
import WorkspaceJSONEditor from "./WorkspaceJSONEditor";

export default function WorkspaceBodyEditor() {
  return (
    <div className="h-full flex flex-col">
      <WorkspaceBodyOptsPopover />
      <div className="flex-1 mt-4 rounded-md py-3 border border-border overflow-hidden">
        <WorkspaceJSONEditor />
      </div>
    </div>
  );
}
