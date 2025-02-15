import JSONEditor from "jsoneditor";
import { useEffect, useRef } from "react";

/**
 * Initializes ace code editor
 */
export default function useCodeEditor({
  onChangeText,
  value,
}: {
  onChangeText: (value: string) => void;
  value: string;
}) {
  // const {} = useExpl;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    editorRef.current = new JSONEditor(containerRef.current, {
      mode: "code",
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
    const editor = editorRef.current;
    editor.aceEditor.container.style.lineHeight = "1.75";
    editor.aceEditor.setOptions({ fontSize: "16px" });

    return () => {
      editor.destroy();
    };
  }, []);

  /**
   * Updates the editor value based on the passed in value
   */
  useEffect(() => {
    if (value === "") {
      editorRef.current?.update(undefined);
      return;
    }
    editorRef.current?.updateText(value || "");
  }, [value]);
  return containerRef;
}
