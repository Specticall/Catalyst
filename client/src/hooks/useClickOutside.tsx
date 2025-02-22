import { useEffect, useRef } from "react";

export default function useClickOutside<T extends HTMLElement>(
  callback: (e: MouseEvent) => void
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.preventDefault();
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target as HTMLElement)) {
        callback(e);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
