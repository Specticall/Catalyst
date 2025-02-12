import { httpStatus } from "@/utils/httpStatus";
import { useWorkspace } from "../../context/workspace/WorkspaceProvider";

export default function WorkspaceResponseStats() {
  const { state } = useWorkspace();
  const contentSizeKB = (
    Number(state.data?.headers["content-length"]) * 0.001
  ).toFixed(2);

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
          <span className="text-highlight-green">{contentSizeKB}KB</span>
        </li>
      )}
    </ul>
  );
}
