import "@/css/jsoneditor.css";
import useCodeEditor from "@/hooks/useCodeEditor";
import useRequestManager from "@/hooks/managers/useRequestManager";
import useControlledAsyncInputState from "@/hooks/useControlledAsyncInputState";

export default function WorkspaceJSONEditor() {
  const { changeBody, body, requestQuery } = useRequestManager();

  const [json, setJson] = useControlledAsyncInputState({
    onChange: (value) => {
      if (requestQuery.isRefetching) return;
      changeBody(value);
    },
    value: body,
  });

  const containerRef = useCodeEditor({
    onChangeText: setJson,
    value: json,
  });

  return <div ref={containerRef} className="h-full"></div>;
}
