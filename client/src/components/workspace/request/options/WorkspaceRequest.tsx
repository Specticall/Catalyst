import { useState } from "react";
import WorkspaceResponse from "../../response/WorkspaceResponse";
import WorkspaceURLInput from "../WorkspaceURLInput";
import { requestOptionsData } from "@/stores/requestStore";
import WorkspaceBodyEditor from "./body/WorkspaceBodyEditor";
import WorkspaceHeaders from "./header/WorkspaceHeaders";
import WorkspaceOptionsSelector from "./WorkspaceOptionsSelector";
import { cn } from "@/utils/lib";
import useResizableWorkspace from "@/hooks/useResizableWorkspace";

export default function WorkspaceRequest() {
  const [active, setActive] =
    useState<(typeof requestOptionsData)[number]>("Body");
  const { barRef, containerRef, progress, handleMouseDown } =
    useResizableWorkspace();

  return (
    <>
      <WorkspaceURLInput />
      <WorkspaceOptionsSelector active={active} setActive={setActive} />
      <div className="flex-1" aria-label="request-workspace-container">
        <div
          className="grid grid-rows-[1fr_1fr] flex-1 h-full"
          style={{
            gridTemplateRows: `${progress}fr ${1 - progress}fr`,
          }}
          ref={containerRef}
        >
          <div className="overflow-hidden flex flex-col">
            <div className=" px-4 py-4 flex-1">
              {active === "Body" && <WorkspaceBodyEditor />}
              {active === "Headers" && <WorkspaceHeaders />}
            </div>
          </div>
          <div className="relative overflow-hidden flex-1">
            <div
              className={cn(
                "group w-full h-6 bg-secondary opacity-0 fixed -translate-y-2 cursor-n-resize z-20 peer"
              )}
              onMouseDown={handleMouseDown}
            ></div>
            <WorkspaceResponse
              ref={barRef}
              className="peer-hover:border-primary"
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
}
