import "@/css/jsoneditor.css";
import { useWorkspace } from "../../../context/workspace/WorkspaceProvider";
import useCodeEditor from "@/components/hooks/useCodeEditor";

export default function WorkspaceJSONEditor() {
  const { dispatch } = useWorkspace();
  const containerRef = useCodeEditor({
    onChangeText: (val) => {
      dispatch({ type: "change/body", payload: val });
    },
  });

  return <div ref={containerRef} className="h-full"></div>;
}
