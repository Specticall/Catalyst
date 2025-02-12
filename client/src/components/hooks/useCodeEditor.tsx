import JSONEditor from "jsoneditor";
import { useEffect, useRef } from "react";

export default function useCodeEditor({
  onChangeText,
}: {
  onChangeText: (value: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const editor = new JSONEditor(containerRef.current, {
      mode: "code",
      language: "javascript",
      navigationBar: false,
      statusBar: false,
      mainMenuBar: false,
      onEditable: () => {
        return {
          field: true, // Allow editing of field names
          value: true, // Allow editing of values
        };
      },
      onChangeText,
    });
    editor.aceEditor.container.style.lineHeight = "1.75";
    editor.aceEditor.setOptions({ fontSize: "16px" });
    editor.set(undefined);

    return () => {
      editor.destroy();
    };
  }, []);
  return containerRef;
}
