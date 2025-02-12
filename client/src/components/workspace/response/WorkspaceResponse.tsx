import { useState } from "react";
import WorkspaceResponseStats from "./WorkspaceResponseStats";
import { cn } from "@/utils/lib";
import WorkspaceResponseContent from "./WorkspaceResponseContent";
import { useWorkspace } from "@/components/context/workspace/WorkspaceProvider";

const responseDisplayOpts = ["JSON", "Raw" /*"Headers"*/] as const;
export default function WorkspaceResponse() {
  const { state } = useWorkspace();
  const [displayOpts, setDisplayOpts] =
    useState<(typeof responseDisplayOpts)[number]>("JSON");

  return (
    <div className="border-t border-border mt-8 whitespace-pre flex-1 flex flex-col">
      <WorkspaceResponseStats />
      <ul className="flex px-4 gap-8 mt-1 text-secondary">
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
      <div className="px-4 border-t border-b border-border py-3 text-secondary">
        <p>Response Body</p>
      </div>
      {state.isFetching && <div className="loader-bar w-full"></div>}
      <WorkspaceResponseContent opts={displayOpts} />
    </div>
  );
}
