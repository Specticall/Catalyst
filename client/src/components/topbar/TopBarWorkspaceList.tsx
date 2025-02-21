import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";
import useUserWorkspacesQuery from "@/hooks/queries/useUserWorkspacesQuery";
import { capitalize, cn } from "@/utils/lib";
import useWorkspaceManager from "@/hooks/managers/useWorkspaceManager";

type Props = {
  onSelect: (id?: number) => void;
};

export default function TopBarWorkspaceList({ onSelect }: Props) {
  const { data } = useUserWorkspacesQuery();
  const { selectWorkspaceId, workspaceId } = useWorkspaceManager();

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="placeholder:text-secondary outline-none focus:border-white transition-all duration-50 border border-transparent text-white w-full pl-11 px-4 py-3 rounded-t-md"
          placeholder="Find Workspace..."
        />
        <Icon
          icon="mingcute:search-line"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-secondary"
        />
      </div>
      <ul className="py-4 px-4 border-border border-t min-h-[20rem]">
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
      <div className="px-4 py-4 flex items-center gap-2 border-border text-white hover:bg-highlight/50 transition-all duration-50 cursor-pointer border-t">
        <Icon icon={"tabler:plus"} className="text-xl" />
        <p>Create New Workspace</p>
      </div>
    </>
  );
}
