import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import WorkspaceBadge from "./WorkspaceBadge";
import { cn } from "@/utils/lib";
import EditableText from "../../ui/EditableText";

export default function WorkspaceBreadcrumbs() {
  const {
    state: { currentWorkingDirectory },
    dispatch,
    explorer,
  } = useExplorer();
  const activeNode = currentWorkingDirectory.at(-1);

  if (!activeNode) {
    return <div>Something went wrong: Breadcrumb active node not found</div>;
  }

  return (
    <ul
      aria-label="workspace-breadcrumbs-container"
      className="flex px-4 py-4 gap-4 mt-13 mb-4 border-b border-border"
    >
      {currentWorkingDirectory.slice(0, -1).map((dir, i) => {
        const isLastElement = i === currentWorkingDirectory.length - 1;
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
                dispatch({
                  type: "select/node",
                  payload: { selectedId: dir.id },
                });
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
      <WorkspaceBadge item={activeNode}>
        <EditableText
          onBlur={(newName) =>
            explorer.update.name(activeNode.id, newName || "New Request")
          }
          value={activeNode.title}
        />
      </WorkspaceBadge>
    </ul>
  );
}
