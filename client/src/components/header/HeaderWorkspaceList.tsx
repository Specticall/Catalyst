import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";

export default function HeaderWorkspaceList() {
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
        <li className="flex justify-between items-center py-3 px-4 bg-highlight/75 rounded-md">
          <div className="place-items-center grid grid-cols-[auto_1fr] gap-x-2.5">
            <Icon icon="mdi:user" className="text-white text-xl" />
            <h3 className="text-white ">
              My Projects
              <span className="ml-3 bg-accent-foreground text-sm  text-accent-highlight px-3 py-0.5 rounded-sm">
                Personal
              </span>
            </h3>
            <div></div>
            <p className="text-secondary mt-0.5 justify-self-start">
              Contributor
            </p>
          </div>
          <Button variant={"hollow"}>Edit</Button>
        </li>
      </ul>
      <div className="px-4 py-4 flex items-center gap-2 border-border text-white hover:bg-highlight/50 transition-all duration-50 cursor-pointer border-t">
        <Icon icon={"tabler:plus"} className="text-xl" />
        <p>Create New Workspace</p>
      </div>
    </>
  );
}
