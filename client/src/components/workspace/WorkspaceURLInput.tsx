import { useWorkspace } from "../context/workspace/WorkspaceProvider";
import Button from "../ui/Button";
import HTTPMethodPopover from "./HTTPMethodPopover";

export default function WorkspaceURLInput() {
  const { dispatch, sendRequest, state } = useWorkspace();
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
      <Button
        onClick={sendRequest}
        variant={"primary"}
        className="ml-4 px-10 text-md"
        isLoading={state.isFetching}
      >
        Send
      </Button>
    </div>
  );
}
