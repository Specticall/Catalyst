import UserSearch from "./UserSearch";
import WorkspaceMemberList from "./WorkspaceMemberList";

export default function WorkspaceMemberEditor() {
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
        <ul className="mt-8 min-h-[15rem] flex flex-col gap-4">
          <WorkspaceMemberList />
        </ul>{" "}
      </div>
    </div>
  );
}
