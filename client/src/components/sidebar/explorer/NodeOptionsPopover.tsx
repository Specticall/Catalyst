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

export default function NodeOptionsPopover({ currentNodeId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { insertGroup, insertRequest, deleteNode } = useExplorerManager();

  const handleAddRequest = () => {
    insertRequest(currentNodeId);
    setIsOpen(false);
  };

  const handleAddGroup = () => {
    insertGroup(currentNodeId);
    setIsOpen(false);
  };

  const handleDelete = () => {
    deleteNode(currentNodeId);
    setIsOpen(false);
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
            className="text-xl text-secondary group-hover:text-white group-hover:bg-secondary/25 rounded-[0.125rem] transition duration-100"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        aria-label="node-options-popover-content"
        className="ignore-click bg-base border border-border rounded-md shadow-lg p-2 flex flex-col w-48"
      >
        <li
          className="text-secondary hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-3 py-1.5 rounded-sm flex gap-2 items-center"
          onClick={handleAddRequest}
        >
          <Icon icon={"tdesign:api"} className="text-xl" />
          Add Request
        </li>
        <li
          className="text-secondary hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-3 py-1.5 rounded-sm  flex gap-2 items-center "
          onClick={handleAddGroup}
        >
          <Icon icon={"material-symbols:folder-outline"} className="text-xl" />
          Add Group
        </li>
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
