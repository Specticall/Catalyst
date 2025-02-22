import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { cn } from "@/utils/lib";
import { useState } from "react";
import TopBarWorkspaceList from "./TopBarWorkspaceList";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";
import { useDialog } from "../ui/Dialog";
import { dialogs } from "@/App";

export default function TopBarWorkspacePopover() {
  const [open, setOpen] = useState(false);
  const { data } = useWorkspaceQuery();
  const dialog = useDialog<typeof dialogs>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center justify-center gap-2 border border-border rounded-sm bg-highlight py-1 cursor-pointer hover:bg-secondary/15 transition-all duration-100 w-full max-w-[20rem]">
        {data?.name ? (
          <p>{data?.name}</p>
        ) : (
          <p className="text-secondary">Select Workspace</p>
        )}
        <Icon
          icon={"mdi:chevron-down"}
          className={cn("text-2xl transition-all duration-300")}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[40rem] bg-base border border-border rounded-md shadow-lg p-0">
        <div className="relative">
          <input
            type="text"
            className="placeholder:text-secondary outline-none focus:border-white transition-all duration-50 border border-transparent text-white w-full pl-11 px-4 py-3 rounded-t-md"
            placeholder="Find Workspace..."
          />
          <Icon
            icon="mingcute:search-line"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-secondary"
          />
        </div>
        <TopBarWorkspaceList onSelect={() => setOpen(false)} />
        <div
          className="px-4 py-4 flex items-center gap-2 border-border text-white hover:bg-highlight/50 transition-all duration-50 cursor-pointer border-t"
          onClick={() => {
            setOpen(false);
            dialog.open("workspace-editor");
          }}
        >
          <Icon icon={"tabler:plus"} className="text-xl" />
          <p>Create New Workspace</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
