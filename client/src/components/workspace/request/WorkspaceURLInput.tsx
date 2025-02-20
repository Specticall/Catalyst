import Button from "../../ui/Button";
import HTTPMethodPopover from "./HTTPMethodPopover";
import Skeleton from "react-loading-skeleton";
import useRequestManager from "@/hooks/managers/useRequestManager";
import useControlledAsyncInputState from "@/hooks/useControlledAsyncInputState";
import { useState } from "react";
import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function WorkspaceURLInput() {
  const [inputIsEmptyError, setInputIsEmptyError] = useState(false);
  const {
    url,
    requestQuery,
    changeURL,
    sendRequest,
    isLoadingResponse,
    abortRequest,
  } = useRequestManager();
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
      <div className="w-full relative">
        <input
          className={cn(
            "bg-highlight border border-border h-full w-full py-2 text-white px-7 rounded-r-md focus:border-primary outline-none transition-all duration-50",
            inputIsEmptyError && "border-red-300"
          )}
          placeholder="Enter URL or paste text"
          onChange={(e) => {
            // Reset error when user inputs value
            if (e.target.value !== "" && inputIsEmptyError) {
              setInputIsEmptyError(false);
            }
            setInputURL(e.target.value);
          }}
          value={inputURL}
        />
        <Icon
          icon="mdi:error-outline"
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-50 text-red-300 invisible opacity-0",
            inputIsEmptyError && "opacity-100 visible"
          )}
        />
      </div>
      <Button
        onClick={() => {
          // Aborts request when user clicks the button
          if (isLoadingResponse) {
            abortRequest();
            return;
          }

          setInputIsEmptyError(false);
          if (inputURL === "") {
            setInputIsEmptyError(true);
            return;
          }
          sendRequest();
        }}
        variant={"primary"}
        className={cn("ml-4 px-10", isLoadingResponse ? "bg-highlight" : "")}
      >
        {isLoadingResponse ? "Cancel" : "Send"}
      </Button>
    </div>
  );
}
