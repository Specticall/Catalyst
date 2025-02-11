import WorkspaceBreadcrumbs from "./WorkspaceBreadcrumbs";
import WorkspaceHistory from "./WorkspaceHistory";
import WorkspaceURLInput from "./WorkspaceURLInput";

export default function Workspace() {
  return (
    <div className="flex-1 min-w-[50rem] ">
      <WorkspaceHistory />
      <WorkspaceBreadcrumbs />
      <WorkspaceURLInput />
    </div>
  );
}
