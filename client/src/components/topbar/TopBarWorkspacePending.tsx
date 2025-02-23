import { capitalize, cn } from "@/utils/lib";
import Button from "../ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { WorkspacePreview } from "@/utils/types";
import useWorkspaceManager from "@/hooks/managers/useWorkspaceManager";
import useAcceptInviteMutation from "@/hooks/mutation/useAcceptInviteMutation";

type Props = {
  data?: WorkspacePreview[];
};
export default function TopBarWorkspacePending({ data }: Props) {
  const { workspaceId } = useWorkspaceManager();
  const { mutate, isPending, variables } = useAcceptInviteMutation();

  if (data?.length === 0) {
    return;
  }

  return (
    <>
      <p className="text-secondary mb-2 px-4 mt-4">
        Pending Invites ({data?.length})
      </p>

      {data?.map((workspace) => {
        return (
          <li
            className={cn(
              "flex justify-between items-center py-3 px-4 rounded-md",
              workspaceId === workspace.id && "bg-highlight/75"
            )}
            key={workspace.id}
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
            <Button
              variant={"primary"}
              onClick={() => {
                mutate({ userWorkspaceId: workspace.userWorkspaceId });
              }}
              isLoading={
                isPending &&
                variables.userWorkspaceId === workspace.userWorkspaceId
              }
            >
              Accept
            </Button>
          </li>
        );
      })}
    </>
  );
}
