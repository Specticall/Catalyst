import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ExplorerTreeNodeCollection,
  ExplorerTreeNodeGroup,
} from "./explorerTree";
import { HTMLAttributes } from "react";

type Props = {
  node: ExplorerTreeNodeCollection | ExplorerTreeNodeGroup;
};

export default function NodeOpenStateToggler({
  node,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // onClick={() => {
      //   dispatch({
      //     type: "toggle/open",
      //     payload: { selectedId: node.id },
      //   });
      // }}
      {...props}
      className={cn(
        "px-2 cursor-pionter ignore-click hover:[&>*]:bg-secondary/20",
        props.className
      )}
    >
      <div className="rounded-sm transition duration-50">
        <Icon
          icon={"mdi:chevron-down"}
          className={cn(
            "text-xl transition-all duration-300",
            !node.isOpen && "-rotate-90"
          )}
        />
      </div>
    </div>
  );
}
