import WorkspaceBreadcrumbs from "./WorkspaceBreadcrumbs";
import WorkspaceHistory from "./WorkspaceHistory";
import WorkspaceOptions from "./WorkspaceOptions";
import WorkspaceResponse from "./WorkspaceResponse";
import WorkspaceURLInput from "./WorkspaceURLInput";

export default function Workspace() {
  return (
    <div className="flex-1 min-w-[50rem] flex flex-col">
      <WorkspaceHistory />
      <WorkspaceBreadcrumbs />
      <WorkspaceURLInput />
      <WorkspaceOptions />
      <WorkspaceResponse />
    </div>
  );
}
