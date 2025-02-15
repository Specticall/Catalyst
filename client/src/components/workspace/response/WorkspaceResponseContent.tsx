import { useWorkspace } from "@/context/workspace/WorkspaceProvider";
import WorkspaceResponseBody from "./WorkspaceResponseBody";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  opts: string;
};
export default function WorkspaceResponseContent({ opts }: Props) {
  const { state } = useWorkspace();
  const fetchData = state.data?.data || state.error?.response?.data;

  if (state.isFetching) {
    return (
      <div className="flex-1 w-full flex items-center flex-col justify-center min-h-[25rem]">
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

  if (!state.data) {
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
    return <WorkspaceResponseBody data={fetchData} />;
  }

  if (opts === "Raw") {
    return (
      <div className="px-4 py-4 leading-[200%] text-primary whitespace-normal">
        {JSON.stringify(fetchData)}
      </div>
    );
  }
}
