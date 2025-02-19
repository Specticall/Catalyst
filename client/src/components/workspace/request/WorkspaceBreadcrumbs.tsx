import { Icon } from "@iconify/react/dist/iconify.js";
import WorkspaceBadge from "./WorkspaceBadge";
import { cn } from "@/utils/lib";
import EditableText from "../../ui/EditableText";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

export default function WorkspaceBreadcrumbs() {
  const { selectNode, updateNodeName, cwd, selectedNode } =
    useExplorerManager();

  if (!selectedNode) {
    return <div>Something went wrong: Breadcrumb active node not found</div>;
  }

  return (
    <ul
      aria-label="workspace-breadcrumbs-container"
      className="flex px-4 py-3 gap-4 mt-13 mb-4 border-b border-border bg-highlight/25"
    >
      {cwd.slice(0, -1).map((dir, i) => {
        const isLastElement = i === cwd.length - 1;
        return (
          <div className="flex gap-2 items-center" key={i}>
            <WorkspaceBadge
              key={i}
              item={dir}
              className={cn(
                "cursor-pointer  transition-all duration-100",
                !isLastElement ? "opacity-60 hover:opacity-100" : "opacity-100"
              )}
              onClick={() => {
                selectNode(dir);
              }}
            >
              {dir.title}
            </WorkspaceBadge>

            <Icon
              icon={"mdi:chevron-up"}
              className="text-secondary rotate-90 text-2xl"
            />
          </div>
        );
      })}
      <WorkspaceBadge item={selectedNode}>
        <EditableText
          onBlur={(newName) => {
            updateNodeName(selectedNode, newName || "New Request");
          }}
          value={selectedNode.title}
        />
      </WorkspaceBadge>
    </ul>
  );
}
