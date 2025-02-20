import { Icon } from "@iconify/react/dist/iconify.js";
import HeaderWorkspacePopover from "./HeaderWorkspacePopover";

export default function Header() {
  return (
    <header className="py-2.5 items-center flex justify-between bg-foreground px-4 border-b border-border text-white">
      <div className="flex items-center gap-1.5">
        <div className="p-1 flex items-center justify-center">
          <Icon icon={"iconoir:spark"} className="text-2xl" />
        </div>
        <p className="text-md">Catalyst</p>
      </div>
      <HeaderWorkspacePopover />
      <div>
        <div className="h-8 aspect-square bg-highlight border-border border rounded-full"></div>
      </div>
    </header>
  );
}
