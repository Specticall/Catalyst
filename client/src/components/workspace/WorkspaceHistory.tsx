import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "../context/explorer/ExplorerProvider";
import WorkspaceBadge from "./WorkspaceBadge";

export default function WorkspaceHistory() {
  const {
    state: { history, selectedId },
    dispatch,
  } = useExplorer();

  return (
    <ul className="flex px-4 gap-4 items-center border-b border-border">
      {history.map((item, i) => {
        return (
          <li
            className={cn(
              "group flex text-white gap-3 px-6 cursor-pointer opacity-70 pb-2 mt-2 hover:opacity-100 pt-2 rounded-t-md transition-all duration-100 items-center whitespace-nowrap",
              selectedId === item.id &&
                "opacity-100 bg-highlight border-b border-highlight-green"
            )}
            key={i}
            onClick={(e) => {
              const element = e.target as HTMLElement;
              if (element.closest(".ignore-click")) return;
              dispatch({
                type: "select/node",
                payload: { selectedId: item.id },
              });
            }}
          >
            <WorkspaceBadge item={item} />
            <Icon
              icon={"material-symbols:close-rounded"}
              className="ignore-click ml-2 text-lg text-primary opacity-70 transition-all duration-100 hover:opacity-100 w-0 group-hover:w-6"
              onClick={() => {
                dispatch({
                  type: "history/delete",
                  payload: { id: item.id },
                });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
