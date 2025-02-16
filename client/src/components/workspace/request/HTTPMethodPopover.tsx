import { Icon } from "@iconify/react/dist/iconify.js";
import HTTPMethodBadge from "../../ui/HTTPMethodBadge";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { HTTPMethods } from "../../sidebar/explorer/explorerTree";
import { useWorkspace } from "@/context/workspace/WorkspaceProvider";
import { cn } from "@/utils/lib";
import { useState } from "react";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import useRequestManager from "@/hooks/managers/useRequestManager";

const HTTPMethodsList: HTTPMethods[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
];

export default function HTTPMethodPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { updateMethod } = useExplorerManager();
  const { method: selectedMethod } = useRequestManager();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="py-1 px-1 pr-3 min-w-[8rem] border bg-base border-border rounded-l-md flex  items-center cursor-pointer transition duration-100 hover:bg-highlight/30 justify-between">
        <HTTPMethodBadge
          method={selectedMethod || "GET"}
          className="px-4 py-2 text-md font-semibold bg-transparent border-transparent"
        />
        <Icon icon={"mdi:chevron-down"} className="text-primary text-2xl" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-48 bg-base border border-border rounded-sm p-1.5 gap-1">
        {HTTPMethodsList.map((method, i) => {
          const isOpen = selectedMethod === method;
          return (
            <div
              onClick={() => {
                updateMethod(method);
                setIsOpen(false);
              }}
              key={i}
              className={cn(
                "text-primary p-1 rounded-sm  transition duration-100 cursor-pointer",
                isOpen ? "bg-highlight" : "hover:bg-highlight/30"
              )}
            >
              <HTTPMethodBadge
                className=" px-3 text-sm py-0.5 w-fit bg-transparent border-transparent"
                method={method}
              />
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
