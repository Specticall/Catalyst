import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../ui/Input";
import useWorkspaceMembersQuery from "@/hooks/queries/useWorkspaceMembersQuery";
import useLoggedInUserQuery from "@/hooks/queries/useLoggedInUserQuery";
import WorkspaceMemberRolePopover from "./WorkspaceMemberRolePopover";

export default function WorkspaceMemberEditor() {
  const { data } = useWorkspaceMembersQuery();
  const { data: loggedInUser } = useLoggedInUserQuery();

  const loggedInUserId = loggedInUser?.id;

  return (
    <>
      <div className="relative">
        <Input
          label="Members"
          placeholder="Add members by name or by email"
          inputClassName="pl-13"
        />
        <Icon
          icon="mingcute:search-line"
          className="absolute left-4 top-1/2 translate-y-[15%] text-2xl text-secondary"
        />
      </div>
      <ul className="mt-8 min-h-[15rem]">
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
                  </p>
                  <p className="text-secondary">{member.email}</p>
                </div>
              </div>
              <WorkspaceMemberRolePopover roleValue={member.role} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
