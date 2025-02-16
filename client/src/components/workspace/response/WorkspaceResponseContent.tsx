import WorkspaceResponseBody from "./WorkspaceResponseBody";
import { Icon } from "@iconify/react/dist/iconify.js";
import useRequestManager from "@/hooks/managers/useRequestManager";

type Props = {
  opts: string;
};
export default function WorkspaceResponseContent({ opts }: Props) {
  const { responseData, responseError, isLoadingResponse } =
    useRequestManager();
  const data =
    responseData?.data ||
    responseError?.response?.data ||
    responseError?.response ||
    {};

  if (isLoadingResponse) {
    return (
      <div className="flex-1 w-full flex items-center flex-col justify-center">
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

  if (!responseData && !responseError) {
    return (
      <div className="text-center py-8 flex items-center justify-center flex-col">
        <div className="bg-base border border-border rounded-sm w-20 h-20 flex items-center justify-center mb-4">
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
    return <WorkspaceResponseBody data={data} />;
  }

  if (opts === "Raw") {
    return (
      <div className="px-4 py-4 leading-[200%] text-primary whitespace-normal">
        {JSON.stringify(data)}
      </div>
    );
  }
}
