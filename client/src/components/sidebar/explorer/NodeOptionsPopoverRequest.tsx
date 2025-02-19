import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  currentNodeId: string;
};

export default function NodeOptionsPopoverRequest({ currentNodeId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteNode } = useExplorerManager();

  const handleDelete = () => {
    deleteNode(currentNodeId);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        aria-label="node-options-popover"
        className="flex items-center cursor-pointer"
      >
        <div className="ignore-click px-2 h-full group">
          <Icon
            icon={"qlementine-icons:menu-dots-16"}
            className="text-xl text-secondary group-hover:text-white group-hover:bg-secondary/25 rounded-[0.125rem] transition duration-50"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        aria-label="node-options-popover-content"
        className="ignore-click bg-base border border-border rounded-md shadow-lg p-2 flex flex-col w-48"
      >
        <li
          className="text-red-300 hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-3 py-1.5 rounded-sm  flex gap-2 items-center "
          onClick={handleDelete}
        >
          <Icon icon={"iconamoon:trash-light"} className="text-xl" />
          Delete
        </li>
      </PopoverContent>
    </Popover>
  );
}
