import Button from "../../ui/Button";
import HTTPMethodPopover from "./HTTPMethodPopover";
import Skeleton from "react-loading-skeleton";
import useRequestManager from "@/hooks/managers/useRequestManager";
import useControlledAsyncInputState from "@/hooks/useControlledAsyncInputState";

export default function WorkspaceURLInput() {
  const { url, requestQuery, changeURL, sendRequest, isLoadingResponse } =
    useRequestManager();
  const [inputURL, setInputURL] = useControlledAsyncInputState({
    onChange: (value) => {
      if (!requestQuery.isRefetching) changeURL(value);
    },
    value: url,
  });

  if (requestQuery.isPending) {
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
        onChange={(e) => {
          setInputURL(e.target.value);
        }}
        value={inputURL}
      />
      <Button
        onClick={sendRequest}
        variant={"primary"}
        className="ml-4 px-10"
        isLoading={isLoadingResponse}
      >
        Send
      </Button>
    </div>
  );
}
