import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { cn } from "@/utils/lib";
import HeaderWorkspaceList from "./HeaderWorkspaceList";

export default function HeaderWorkspacePopover() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-2 border border-border rounded-sm bg-highlight py-1 cursor-pointer hover:bg-secondary/15 transition-all duration-100 w-full max-w-[20rem]">
        <p>Personal</p>
        <Icon
          icon={"mdi:chevron-down"}
          className={cn("text-2xl transition-all duration-300")}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[40rem] bg-base border border-border rounded-md shadow-lg p-0">
        <HeaderWorkspaceList />
      </PopoverContent>
    </Popover>
  );
}
