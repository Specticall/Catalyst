import { useEffect, useRef, useState } from "react";

export default function useResizableWorkspace() {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
      if (barRef.current) barRef.current.style.borderColor = "";
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

  const handleMouseDown = () => {
    document.body.style.userSelect = "none";
    document.body.style.cursor = "n-resize";
    if (barRef.current) barRef.current.style.borderColor = "white";
    setIsDragging(true);
  };

  return { containerRef, barRef, progress, handleMouseDown };
}
