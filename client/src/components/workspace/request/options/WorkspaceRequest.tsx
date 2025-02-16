import { useEffect, useRef, useState } from "react";
import WorkspaceResponse from "../../response/WorkspaceResponse";
import WorkspaceURLInput from "../WorkspaceURLInput";
import { requestOptionsData } from "@/stores/requestStore";
import WorkspaceBodyEditor from "./body/WorkspaceBodyEditor";
import WorkspaceHeaders from "./header/WorkspaceHeaders";
import WorkspaceOptionsSelector from "./WorkspaceOptionsSelector";
import { cn } from "@/utils/lib";

export default function WorkspaceRequest() {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] =
    useState<(typeof requestOptionsData)[number]>("Body");

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
      if (barRef.current) barRef.current.style.opacity = "0%";
    };

    const handleMouseMove = (e: MouseEvent) => {
      const barElement = containerRef.current;
      if (!barElement) return;
      const rect = barElement.getBoundingClientRect();
      const max = rect.bottom;
      const min = rect.top;
      const current = e.clientY - min;
      const progress = Math.max(current / (max - min), 0);
      const progressLimited = Math.min(progress, 0.9);
      setProgress(progressLimited);
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

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
                "w-full h-1 bg-secondary opacity-0 absolute top-0 cursor-n-resize hover:!opacity-100"
              )}
              ref={barRef}
              onMouseDown={() => {
                document.body.style.userSelect = "none";
                document.body.style.cursor = "n-resize";
                if (barRef.current) barRef.current.style.opacity = "100%";
                setIsDragging(true);
              }}
            ></div>
            <WorkspaceResponse />
          </div>{" "}
        </div>
      </div>
    </>
  );
}
