import useWorkspaceMembersQuery from "@/hooks/queries/useWorkspaceMembersQuery";
import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import WorkspaceMemberRolePopover from "./WorkspaceMemberRolePopover";
import UserSearch from "./UserSearch";

export default function WorkspaceMemberEditor() {
  const { data } = useWorkspaceMembersQuery();
  const { data: loggedInUser } = useLoggedInUserQuery();

  const loggedInUserId = loggedInUser?.id;

  return (
    <div className="bg-base border border-border rounded-md w-full max-w-[40rem]">
      <div className="py-6 border-b border-border px-8">
        <h2 className="text-primary text-xl">People with access</h2>
        <p className="text-secondary">
          Invite your team to collaborate on this workspace
        </p>
      </div>
      <div className="px-8 py-6">
        <UserSearch />
        <ul className="mt-8 min-h-[15rem] flex flex-col gap-6">
          {data?.map((member, id) => {
            return (
              <li className="flex items-center justify-between" key={id}>
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
          })}
        </ul>{" "}
      </div>
    </div>
  );
}
