import { useWorkspace } from "../context/workspace/WorkspaceProvider";
import HTTPMethodPopover from "./HTTPMethodPopover";

export default function WorkspaceURLInput() {
  const { dispatch, sendRequest } = useWorkspace();
  return (
    <div className="px-4 flex">
      <HTTPMethodPopover />
      <input
        className="bg-highlight border border-border w-full py-2 text-white px-7 rounded-r-md"
        placeholder="Enter URL or paste text"
        onChange={(e) =>
          dispatch({ type: "change/url", payload: e.target.value })
        }
      />
      <button
        onClick={sendRequest}
        className="ml-4 bg-accent cursor-pointer text-white px-10 rounded-md"
      >
        Send
      </button>
    </div>
  );
}
