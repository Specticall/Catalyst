import { Popover, PopoverContent } from "@/components/ui/Popover";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PopoverTrigger } from "@radix-ui/react-popover";

export default function WorkspaceBodyOptsPopover() {
  return (
    <Popover>
      <PopoverTrigger className="bg-highlight rounded-md text-primary px-4 py-2 flex items-center gap-2 cursor-pointer hover:opacity-80 w-fit ">
        JSON
        <Icon icon={"bx:chevron-down"} className="text-xl" />
      </PopoverTrigger>
      <PopoverContent className="bg-base w-48 p-2 border-borderp shadow-none">
        <div className="text-white bg-highlight rounded-md px-4 py-2">JSON</div>
        <div className="text-secondary rounded-md px-4 py-2">
          Form Data (TBA)
        </div>
      </PopoverContent>
    </Popover>
  );
}
