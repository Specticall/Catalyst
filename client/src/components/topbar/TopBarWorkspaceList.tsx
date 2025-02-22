import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";
import useUserWorkspacesQuery from "@/hooks/queries/useUserWorkspacesQuery";
import { capitalize, cn } from "@/utils/lib";
import useWorkspaceManager from "@/hooks/managers/useWorkspaceManager";
import Skeleton from "react-loading-skeleton";

type Props = {
  onSelect: (id?: number) => void;
};

export default function TopBarWorkspaceList({ onSelect }: Props) {
  const { data, isLoading } = useUserWorkspacesQuery();
  const { selectWorkspaceId, workspaceId } = useWorkspaceManager();

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
      <p className="text-secondary mb-2 px-4">My Workspaces ({data?.length})</p>
      {data?.map((workspace) => {
        return (
          <li
            className={cn(
              "flex justify-between items-center py-3 px-4 rounded-md hover:bg-highlight/50 cursor-pointer",
              workspaceId === workspace.id && "bg-highlight/75"
            )}
            key={workspace.id}
            onClick={() => {
              selectWorkspaceId(workspace.id);
              onSelect(workspace.id);
            }}
          >
            <div className="place-items-center grid grid-cols-[auto_1fr] gap-x-2.5">
              <Icon icon="mdi:user" className="text-white text-xl" />
              <h3 className="text-white ">
                {workspace.name}
                <span className="ml-3 bg-accent-foreground text-sm  text-accent-highlight px-3 py-0.5 rounded-sm">
                  Personal
                </span>
              </h3>
              <div></div>
              <p className="text-secondary mt-0.5 justify-self-start">
                {capitalize(workspace.role)}
              </p>
            </div>
            <Button variant={"hollow"}>Edit</Button>
          </li>
        );
      })}
    </ul>
  );
}
