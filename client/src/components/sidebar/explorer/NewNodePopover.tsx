import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "@/components/context/explorer/ExplorerProvider";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

type Props = {
  currentNodeId: string;
};

export default function NewNodePopover({ currentNodeId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const explorer = useExplorer();

  const handleAddRequest = () => {
    explorer.dispatch({
      type: "insert/request",
      payload: { targetId: currentNodeId },
    });
    setIsOpen(false);
  };

  const handleAddGroup = () => {
    explorer.dispatch({
      type: "insert/group",
      payload: { targetId: currentNodeId },
    });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center cursor-pointer">
        <div className="ignore-click px-2 h-full group">
          <Icon
            icon={"mdi:add"}
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
          Request
        </li>
        <li
          className="text-secondary hover:text-white transition-all duration-100 cursor-pointer hover:bg-highlight/20 px-4 py-1 rounded-sm  flex gap-2 items-center "
          onClick={handleAddGroup}
        >
          <Icon icon={"material-symbols:folder-outline"} className="text-xl" />
          Group
        </li>
      </PopoverContent>
    </Popover>
  );
}
