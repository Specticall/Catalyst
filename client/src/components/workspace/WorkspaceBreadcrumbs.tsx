import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "../context/explorer/ExplorerProvider";
import WorkspaceBadge from "./WorkspaceBadge";
import { cn } from "@/utils/lib";

export default function WorkspaceBreadcrumbs() {
  const {
    state: { currentWorkingDirectory },
    dispatch,
  } = useExplorer();
  return (
    <ul className="flex px-4 py-6 gap-4">
      {currentWorkingDirectory.map((dir, i) => {
        const isLastElement = i === currentWorkingDirectory.length - 1;
        return (
          <div className="flex gap-2">
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
            />
            {/* Exclude seperator render on the last element  */}
            {!isLastElement && (
              <Icon
                icon={"mdi:chevron-up"}
                className="text-secondary rotate-90 text-2xl"
              />
            )}
          </div>
        );
      })}
    </ul>
  );
}
