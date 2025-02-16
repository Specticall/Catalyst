import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export default function useControlledAsyncInputState(
  { onChange, value }: { onChange: (value: string) => void; value?: string },
  debounceTimeMS?: number
) {
  const [inputURL, setInputURL] = useState("");
  const debouncedURLInput = useDebounce(inputURL, debounceTimeMS || 300);

  useEffect(() => {
    if (typeof value === "undefined") return;
    setInputURL(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedURLInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedURLInput]);

  return [inputURL, setInputURL] as const;
}
