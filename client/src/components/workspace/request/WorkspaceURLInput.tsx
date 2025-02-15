import { useWorkspace } from "@/context/workspace/WorkspaceProvider";
import Button from "../../ui/Button";
import HTTPMethodPopover from "./HTTPMethodPopover";
import Skeleton from "react-loading-skeleton";

export default function WorkspaceURLInput() {
  const { dispatch, sendRequest, state, save, isLoadingWorkspace } =
    useWorkspace();
  if (isLoadingWorkspace) {
    return (
      <div className="px-4 h-12 w-full grid grid-cols-[5fr_1fr_1fr] gap-4">
        <Skeleton className="h-full" containerClassName="flex-1" />
        <Skeleton className="h-full" containerClassName="flex-1" />
        <Skeleton className="h-full" containerClassName="flex-1" />
      </div>
    );
  }

  return (
    <div className="px-4 flex">
      <HTTPMethodPopover />
      <input
        className="bg-highlight border border-border w-full py-2 text-white px-7 rounded-r-md"
        placeholder="Enter URL or paste text"
        onChange={(e) =>
          dispatch({ type: "change/url", payload: e.target.value })
        }
        value={state.url}
      />
      <Button
        onClick={sendRequest}
        variant={"primary"}
        className="ml-4 px-10"
        isLoading={state.isFetching}
      >
        Send
      </Button>
      <Button
        onClick={() => save()}
        variant={"secondary"}
        isLoading={state.isSaving}
        className="px-10 ml-4"
      >
        Save
      </Button>
    </div>
  );
}
