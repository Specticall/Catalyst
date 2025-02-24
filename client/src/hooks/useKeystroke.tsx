import { useEffect } from "react";

export default function useKeystroke(callback: () => void, key: string) {
  useEffect(() => {
    const handleKeystroke = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener("keyup", handleKeystroke);
    return () => {
      window.removeEventListener("keyup", handleKeystroke);
    };
  }, [key, callback]);
}
