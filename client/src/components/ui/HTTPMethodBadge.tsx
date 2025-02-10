import { HTMLAttributes } from "react";
import { HTTPMethods } from "../sidebar/explorer/explorerTree";
import { cn } from "@/utils/lib";

type Props = {
  method: HTTPMethods;
};

const styles: Record<HTTPMethods, string> = {
  DELETE: "text-[#FF78A3] bg-[#381C38]",
  GET: "text-[#78FFA5] bg-[#213123]",
  POST: "text-[#FFCB78] bg-[#312521]",
  PUT: "text-[#78EBFF] bg-[#1C3038]",
  PATCH: "text-[#788AFF] bg-[#1D1C38]",
};

export default function HTTPMethodBadge({
  method,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "text-[0.75rem] border border-border bg-base px-2 py-0.5 rounded-sm",
        styles[method],
        props.className
      )}
    >
      {method}
    </div>
  );
}
