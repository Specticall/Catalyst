import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HTMLAttributes, useState } from "react";

type Props = {
  value?: boolean;
  onCheck?: (value: boolean) => void;
};

export default function Checkbox({
  value,
  onCheck,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [checked, setChecked] = useState(false);
  const val = typeof value === "undefined" ? checked : value;

  return (
    <div
      {...props}
      className={cn(
        "w-5 h-5 flex items-center justify-center border border-secondary/50 rounded-sm cursor-pointer  transition-all duration-50 bg-highlight",
        val ? "bg-primary" : "hover:bg-secondary/10",
        props.className
      )}
      onClick={() => {
        setChecked((cur) => !cur);
        if (onCheck) onCheck(!checked);
      }}
    >
      {
        <Icon
          icon={"material-symbols:check-rounded"}
          className={cn(
            "text-base opacity-0 transition-all duration-50",
            val && "opacity-100"
          )}
        />
      }
    </div>
  );
}
