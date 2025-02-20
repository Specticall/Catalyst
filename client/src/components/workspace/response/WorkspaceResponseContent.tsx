import WorkspaceResponseBody from "./WorkspaceResponseBody";
import { Icon } from "@iconify/react/dist/iconify.js";
import useRequestManager from "@/hooks/managers/useRequestManager";
import { useEffect } from "react";
import useExplorerManager from "@/hooks/managers/useExplorerManager";

type Props = {
  opts: string;
};

export default function WorkspaceResponseContent({ opts }: Props) {
  const { responseData, isLoadingResponse, setResponseData } =
    useRequestManager();
  const { selectedNode } = useExplorerManager();

  // Load previous value from session storage
  useEffect(() => {
    if (!selectedNode) {
      setResponseData(undefined);
      return;
    }
    const prevValue = sessionStorage.getItem(selectedNode.id);
    setResponseData(prevValue ? JSON.parse(prevValue) : undefined);
  }, [selectedNode?.id, selectedNode, setResponseData]);

  if (isLoadingResponse) {
    return (
      <div className="flex-1 w-full h-full flex items-center flex-col justify-center">
        <div className="loader"></div>
        <p className="text-primary text-2xl mt-4 font-semibold">
          Fetching Data
        </p>
        <p className="text-secondary">
          Please hold on while we process your request
        </p>
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="h-full bg-gradient-to-t from-black/25 from-20% to-80% to-transparent text-center py-8 flex items-center justify-center flex-col">
        <div className="bg-base border border-border rounded-sm w-20 min-h-20 flex items-center justify-center mb-4">
          <Icon
            icon={"radix-icons:rocket"}
            className="text-[3rem] text-white"
          />
        </div>
        <h2 className="text-primary text-2xl">No Response Yet</h2>
        <p className="text-secondary mt-1">Click send to get a response</p>
      </div>
    );
  }

  if (opts === "JSON") {
    return <WorkspaceResponseBody data={responseData.data} />;
  }

  if (opts === "Raw") {
    return (
      <div className="px-4 py-4 leading-[200%] text-primary whitespace-normal">
        {JSON.stringify(responseData.data)}
      </div>
    );
  }
}
