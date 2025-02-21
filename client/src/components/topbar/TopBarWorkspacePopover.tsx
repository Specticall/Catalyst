import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { cn } from "@/utils/lib";
import { useState } from "react";
import TopBarWorkspaceList from "./TopBarWorkspaceList";
import useWorkspaceQuery from "@/hooks/queries/useWorkspaceQuery";

export default function TopBarWorkspacePopover() {
  const [open, setOpen] = useState(false);
  const { data } = useWorkspaceQuery();

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
        <TopBarWorkspaceList onSelect={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
