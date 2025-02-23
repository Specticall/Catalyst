import useUserWorkspacesQuery from "@/hooks/queries/useUserWorkspacesQuery";
import Skeleton from "react-loading-skeleton";
import TopBarWorkspacePending from "./TopBarWorkspacePending";
import TopBarWorkspace from "./TopBarWorkspace";

type Props = {
  onSelect: (id?: number) => void;
};

export default function TopBarWorkspaceList({ onSelect }: Props) {
  const { data, isLoading } = useUserWorkspacesQuery();

  if (isLoading) {
    return (
      <div className="px-4 grid gap-2 py-4 border-border border-t">
        <Skeleton width={"10rem"} />
        {new Array(5).fill("x").map((_, i) => {
          return <Skeleton key={i} className="h-12" />;
        })}
      </div>
    );
  }

  return (
    <ul className="py-4 px-4 border-border border-t min-h-[20rem]">
      <TopBarWorkspace data={data?.workspace} onSelect={onSelect} />
      <TopBarWorkspacePending data={data?.pending} />
    </ul>
  );
}
