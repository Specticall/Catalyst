import JSONEditor from "jsoneditor";
import { useEffect, useRef } from "react";
import "@/css/jsoneditor.css";

const initialJson = {
  Array: [1, 2, 3],
  Boolean: true,
  Null: null,
  Number: 123,
  Object: { a: "b", c: "d" },
  String: "Hello World",
};

export default function WorkspaceOptions() {
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
    });
    editor.aceEditor.container.style.lineHeight = "1.5";
    editor.set(initialJson);

    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[20rem] mt-4 px-4"></div>;
}
