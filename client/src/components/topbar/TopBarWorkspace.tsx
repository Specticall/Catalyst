import { capitalize, cn } from "@/utils/lib";
import Button from "../ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { WorkspacePreview } from "@/utils/types";
import useWorkspaceManager from "@/hooks/managers/useWorkspaceManager";
import { WorkspaceEditorDialogContext } from "./TopBarWorkspaceList";
import { useDialog } from "../ui/Dialog";
import { dialogs } from "@/App";

type Props = {
  data?: WorkspacePreview[];
  workspaceId?: number;
  onSelect: (id?: number) => void;
};

export default function TopBarWorkspace({ data, onSelect }: Props) {
  const { workspaceId, selectWorkspaceId } = useWorkspaceManager();
  const dialog = useDialog<typeof dialogs>();

  const handleEdit = (context: WorkspaceEditorDialogContext) => {
    dialog.open("workspace-editor", context);
  };

  return (
    <>
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
                {workspace.profilePictures.length > 1 ? (
                  <span className="ml-3 bg-green-foreground  text-sm  text-green-highlight px-3 py-0.5 rounded-sm">
                    Team
                  </span>
                ) : (
                  <span className="ml-3 bg-accent-foreground text-sm  text-accent-highlight px-3 py-0.5 rounded-sm">
                    Personal
                  </span>
                )}
              </h3>
              <div></div>
              <p className="text-secondary mt-0.5 justify-self-start">
                {capitalize(workspace.role)}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center">
                <div className="h-8 aspect-square -ml-2"></div>
                {workspace.profilePictures.length > 1 &&
                  workspace.profilePictures.map((pfp, i) => {
                    return (
                      <img
                        src={pfp}
                        key={i}
                        className={cn(
                          "object-cover h-8 aspect-square rounded-full -ml-2  border-base"
                        )}
                        referrerPolicy="no-referrer"
                      />
                    );
                  })}
              </div>
              {workspace.role === "owner" && (
                <Button
                  variant={"hollow"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelect();
                    handleEdit(workspace);
                  }}
                >
                  Edit
                </Button>
              )}
            </div>
          </li>
        );
      })}
    </>
  );
}
