import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";

const opts = ["Strict", "Lax", "None"] as const;
type OptionsValue = (typeof opts)[number];

type Props = {
  onChange?: (value: OptionsValue) => void;
  value?: OptionsValue;
};

export default function CookiesSameSiteDropdown({ onChange, value }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OptionsValue>("None");

  const usedValue = typeof value === "undefined" ? selected : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full text-white text-start border border-border px-5 py-3 rounded-sm hover:bg-highlight/50 cursor-pointer flex items-center justify-between">
        {usedValue}
        <Icon
          icon={"mdi:chevron-down"}
          className={cn(
            "text-secondary text-2xl -rotate-90 transition-all duration-100",
            open && "rotate-0"
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        className="grid p-2 py-3 rounded-sm, gap-2 bg-base z-10 border-border border "
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        {opts.map((opt, i) => {
          return (
            <div
              key={i}
              className={cn(
                "px-4 py-1.5 rounded-sm text-secondary hover:bg-highlight/50 transition duration-100",
                usedValue === opt && "text-white bg-highlight"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onChange) onChange(opt);
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
