import WorkspaceBreadcrumbs from "./request/WorkspaceBreadcrumbs";
import WorkspaceHistory from "./request/WorkspaceHistory";
import Workspace from "./Workspace";

export default function WorkspaceLayout() {
  return (
    <section className="overflow-auto absolute inset-0 left-[22.5rem] flex flex-col">
      <div className="flex-1 min min-w-[50rem] flex flex-col">
        <WorkspaceHistory />
        <WorkspaceBreadcrumbs />
        <Workspace />
      </div>
    </section>
  );
}
