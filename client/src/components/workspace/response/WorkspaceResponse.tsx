import { forwardRef, HTMLAttributes, Ref, useState } from "react";
import WorkspaceResponseStats from "./WorkspaceResponseStats";
import { cn } from "@/utils/lib";
import WorkspaceResponseContent from "./WorkspaceResponseContent";
import useRequestManager from "@/hooks/managers/useRequestManager";

const responseDisplayOpts = ["JSON", "Raw" /*"Headers"*/] as const;
function WorkspaceResponse(
  props: HTMLAttributes<HTMLDivElement>,
  ref: Ref<HTMLDivElement>
) {
  const { isLoadingResponse } = useRequestManager();
  const [displayOpts, setDisplayOpts] =
    useState<(typeof responseDisplayOpts)[number]>("JSON");

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "border-t-2 border-secondary/50 whitespace-pre flex-1 flex flex-col h-full",
        props.className
      )}
    >
      <WorkspaceResponseStats />
      <ul className="flex px-4 gap-8 border-b border-border mt-1 text-secondary">
        {responseDisplayOpts.map((opt, i) => {
          return (
            <li
              key={i}
              onClick={() => setDisplayOpts(opt)}
              className={cn(
                "relative pb-2 transition duration-100 hover:text-white cursor-pointer",
                displayOpts === opt && "text-white"
              )}
            >
              {opt}
              <div
                className={cn(
                  "absolute opacity-0 left-0 transition duration-100 right-0 bottom-0 h-0.75 bg-accent",
                  displayOpts === opt && "opacity-100"
                )}
              ></div>
            </li>
          );
        })}
      </ul>
      {isLoadingResponse && <div className="loader-bar w-full"></div>}
      <div className="flex items-center justify-center relative flex-1">
        <div className="absolute inset-0 overflow-auto" data-response-container>
          <WorkspaceResponseContent opts={displayOpts} />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(WorkspaceResponse);
