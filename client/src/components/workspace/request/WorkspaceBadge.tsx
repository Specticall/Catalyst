import { Icon } from "@iconify/react/dist/iconify.js";
import HTTPMethodBadge from "../../ui/HTTPMethodBadge";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/lib";
import { HistoryNode } from "@/context/explorer/explorerTypes";

const getBadge = (item: HistoryNode) => {
  switch (item.type) {
    case "request":
      return <HTTPMethodBadge method={item.httpMethod} />;
    case "collection":
      return (
        <div className="border border-border rounded-sm py-1 px-1.5">
          <Icon icon={"bx:collection"} className="text-md" />
        </div>
      );
    case "group":
      return (
        <div className="border border-border rounded-sm py-1 px-1.5">
          <Icon icon={"bx:collection"} className="text-md" />
        </div>
      );
  }
};

export default function WorkspaceBadge({
  item,
  children,
  ...props
}: { item: HistoryNode; children?: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...props}
      className={cn("flex gap-2 items-center text-white", props.className)}
    >
      {getBadge(item)}
      {children || item.title}
    </div>
  );
}
