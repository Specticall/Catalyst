import { httpStatus } from "@/utils/httpStatus";
import { useWorkspace } from "@/context/workspace/WorkspaceProvider";

export default function WorkspaceResponseStats() {
  const { state } = useWorkspace();
  const contentLength = state.data?.headers["content-length"];
  const contentSizeKB = contentLength
    ? (Number(contentLength) * 0.001).toFixed(2)
    : 0;

  return (
    <ul className="px-4 flex gap-4 py-3">
      <li className="text-primary">
        Status <span className="text-secondary">:</span>{" "}
        <span className="text-highlight-green">
          {state.data?.status} {"  "}•{"  "}
          {state.data?.status
            ? httpStatus[state.data?.status as keyof typeof httpStatus]
            : ""}
        </span>
      </li>
      {state.data && (
        <li className="text-primary">
          Size <span className="text-secondary">:</span>{" "}
          {contentLength ? (
            <span className="text-highlight-green">{contentSizeKB}KB</span>
          ) : (
            <span className="text-highlight-green"> - </span>
          )}
        </li>
      )}
    </ul>
  );
}
