import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import WorkspaceMemberRolePopover from "./WorkspaceMemberRolePopover";
import useWorkspaceMembersQuery from "@/hooks/queries/collaboration/useWorkspaceMembersQuery";
import Skeleton from "react-loading-skeleton";

export default function WorkspaceMemberList() {
  const { data: loggedInUser } = useLoggedInUserQuery();
  const { data, isLoading } = useWorkspaceMembersQuery();
  const loggedInUserId = loggedInUser?.id;

  if (isLoading) {
    return new Array(3).fill("x").map((_, i) => {
      return <Skeleton key={i} className="h-14" />;
    });
  }

  return data?.map((member, id) => {
    return (
      <li className="flex items-center justify-between py-2" key={id}>
        <div className="flex items-center gap-x-5">
          <img
            src={member.profilePicture}
            alt="pfp"
            referrerPolicy="no-referrer"
            className="w-12 aspect-square rounded-full"
          />
          <div>
            <p className="text-lg text-primary leading-[150%] flex items-center">
              {member.username}{" "}
              {loggedInUserId === member.id && (
                <span className="bg-accent text-white leading-[125%] py-0.5 px-2 ml-2 h-fit rounded-sm text-[0.75rem]">
                  You
                </span>
              )}
              {member.isPendingInvite && (
                <span className="bg-highlight text-white leading-[125%] py-0.5 px-2 ml-2 h-fit rounded-sm text-[0.75rem]">
                  Pending Invite
                </span>
              )}
            </p>
            <p className="text-secondary">{member.email}</p>
          </div>
        </div>
        <WorkspaceMemberRolePopover roleValue={member.role} />
      </li>
    );
  });
}
