import { useWorkspace } from "@/context/workspace/WorkspaceProvider";
import WorkspaceBreadcrumbs from "./request/WorkspaceBreadcrumbs";
import WorkspaceHistory from "./request/WorkspaceHistory";
import Workspace from "./Workspace";
import { useEffect, useRef } from "react";

export default function WorkspaceLayout() {
  const {
    state: { prevWorkspaceContainerScrollY },
  } = useWorkspace();
  const workspaceContainerRef = useRef<HTMLDivElement | null>(null);

  // Preverse the scroll of the element
  // We added a random number suffix at the end (with the "-" delimiter) to ensure this effect runs everytime the dispatch is called
  const prevScrollY = Number(prevWorkspaceContainerScrollY.split("-")[0]);
  useEffect(() => {
    const preserveScroll = () => {
      if (workspaceContainerRef.current) {
        workspaceContainerRef.current?.scrollTo({
          top: prevScrollY,
        });
      }
    };

    requestAnimationFrame(preserveScroll);
  }, [prevWorkspaceContainerScrollY, prevScrollY]);

  return (
    <section
      ref={workspaceContainerRef}
      data-workspace-container
      className="overflow-auto absolute inset-0 left-[20rem] flex flex-col"
    >
      <div className="flex-1 min min-w-[50rem] flex flex-col">
        <WorkspaceHistory />
        <WorkspaceBreadcrumbs />
        <Workspace />
      </div>
    </section>
  );
}
