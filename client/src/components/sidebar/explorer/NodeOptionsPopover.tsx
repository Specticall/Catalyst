import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "@/context/explorer/ExplorerProvider";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

type Props = {
  currentNodeId: string;
};

export default function NodeOptionsPopover({ currentNodeId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { explorer } = useExplorer();

  const handleAddRequest = () => {
    explorer.insert.request(currentNodeId);
    setIsOpen(false);
  };

  const handleAddGroup = () => {
    explorer.insert.group(currentNodeId);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center cursor-pointer">
        <div className="ignore-click px-2 h-full group">
          <Icon
            icon={"qlementine-icons:menu-dots-16"}
            className="text-xl text-secondary group-hover:text-white transition duration-100"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="ignore-click bg-base border border-border rounded-md shadow-lg p-2 flex flex-col w-48">
        <li
          className="text-secondary hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-4 py-1 rounded-sm flex gap-2 items-center"
          onClick={handleAddRequest}
        >
          <Icon icon={"tdesign:api"} className="text-xl" />
          Add Request
        </li>
        <li
          className="text-secondary hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-4 py-1 rounded-sm  flex gap-2 items-center "
          onClick={handleAddGroup}
        >
          <Icon icon={"material-symbols:folder-outline"} className="text-xl" />
          Add Group
        </li>
      </PopoverContent>
    </Popover>
  );
}
