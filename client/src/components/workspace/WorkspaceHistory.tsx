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
    <div className="absolute top-0 left-0 right-0 overflow-x-auto pb-2">
      <ul className="flex px-4 gap-4 items-center border-b border-border">
        {history.map((item, i) => {
          return (
            <li
              className={cn(
                "relative group flex text-white gap-3 pl-6 pr-12 cursor-pointer opacity-70 pb-2 mt-2 hover:opacity-100 pt-2 rounded-t-md transition-all duration-100 items-center whitespace-nowrap",
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
              <div
                className="absolute inset-0 left-[75%] ignore-click ml-2  transition-all duration-50 group-hover:opacity-100 opacity-0 invisible group-hover:visible bg-gradient-to-l from-base to-transparent flex justify-end items-center pr-4"
                onClick={() => {
                  dispatch({
                    type: "history/delete",
                    payload: { id: item.id },
                  });
                }}
              >
                <Icon
                  icon={"material-symbols:close-rounded"}
                  className="text-lg text-primary"
                />
              </div>
            </li>
          );
        })}
      </ul>{" "}
    </div>
  );
}
