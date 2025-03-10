import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";
import useAuthMutation from "@/hooks/mutation/useAuthMutation";
import TopBarWorkspacePopover from "./TopBarWorkspacePopover";
import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import { useDialog } from "../ui/Dialog";
import { dialogs } from "@/App";
import useWorkspaceManager from "@/hooks/managers/useWorkspaceManager";

export default function TopBar() {
  const { workspaceId } = useWorkspaceManager();
  const dialog = useDialog<typeof dialogs>();
  const { logoutMutation } = useAuthMutation();
  const { data } = useLoggedInUserQuery();
  return (
    <header className="py-2.5 items-center flex justify-between bg-foreground px-4 border-b border-border text-white">
      <div className="flex items-center gap-1.5">
        <div className="p-1 flex items-center justify-center">
          <Icon icon={"iconoir:spark"} className="text-2xl" />
        </div>
        <p className="text-md">Catalyst</p>
      </div>
      <TopBarWorkspacePopover />
      <div className="flex gap-4">
        {workspaceId !== undefined && (
          <Button onClick={() => dialog.open("member-editor")} className="py-2">
            + Invite
          </Button>
        )}
        <Button
          onClick={() => logoutMutation.mutate()}
          isLoading={logoutMutation.isPending}
          variant={"hollow"}
          className="py-2"
        >
          Logout
        </Button>
        <img
          className="h-8 aspect-square bg-highlight border-border border rounded-full"
          referrerPolicy="no-referrer"
          src={data?.profilePicture}
        />
      </div>
    </header>
  );
}
