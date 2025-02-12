import { useWorkspace } from "@/components/context/workspace/WorkspaceProvider";
import WorkspaceResponseBody from "./WorkspaceResponseBody";

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
