import "@/css/jsoneditor.css";
import { useWorkspace } from "@/context/workspace/WorkspaceProvider";
import useCodeEditor from "@/hooks/useCodeEditor";

export default function WorkspaceJSONEditor() {
  const { dispatch, state } = useWorkspace();
  const containerRef = useCodeEditor({
    onChangeText: (val) => {
      dispatch({ type: "change/body", payload: val });
    },
    value: state.bodyJSON,
  });

  return <div ref={containerRef} className="h-full"></div>;
}
