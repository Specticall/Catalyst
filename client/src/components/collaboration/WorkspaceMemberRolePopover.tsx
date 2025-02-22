import { WorkspaceRole } from "@/utils/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { capitalize, cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type Props = {
  roleValue: WorkspaceRole;
  onSelect?: (role: WorkspaceRole) => void;
};

const roles: WorkspaceRole[] = ["editor", "viewer"];

export default function WorkspaceMemberRolePopover({
  roleValue,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  console.log(roleValue);

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (roleValue !== "owner") setOpen(value);
      }}
    >
      <PopoverTrigger className="text-white flex items-center gap-2 py-2 px-4">
        {capitalize(roleValue)}
        {roleValue !== "owner" && (
          <Icon
            icon={"mdi:chevron-down"}
            className={cn(
              "text-secondary text-2xl -rotate-90 transition-all duration-100",
              open && "rotate-0"
            )}
          />
        )}
      </PopoverTrigger>
      <PopoverContent className="border border-border p-2 rounded-sm w-32">
        {roles.map((role, i) => {
          return (
            <div
              key={i}
              className={cn(
                "text-secondary px-4 py-2 cursor-pointer hover:bg-highlight rounded-sm transition duration-100",
                role === roleValue && "bg-highlight text-white"
              )}
              onClick={() => {
                if (onSelect) onSelect(role);
              }}
            >
              {capitalize(role)}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
