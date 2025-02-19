import { Icon } from "@iconify/react/dist/iconify.js";
import FileExplorer from "./components/sidebar/explorer/Explorer";
import WorkspaceLayout from "./components/workspace/WorkspaceLayout";
import ExplorerHeader from "./components/sidebar/explorer/ExplorerHeader";
import { DialogComponents, DialogProvider } from "./components/ui/Dialog";
import CookiesDialog from "./components/cookies/CookiesDialog";
import ToastProvider from "./components/ui/Toast";

export const dialogs = [
  {
    name: "cookie",
    component: <CookiesDialog />,
  },
] as const satisfies DialogComponents;

export default function App() {
  return (
    <ToastProvider>
      <DialogProvider components={dialogs}>
        <div className="min-h-screen w-full bg-base">
          <div className="min-h-screen flex flex-col">
            <header className="py-2 bg-foreground px-4 border-b border-border text-white">
              <div className="flex items-center gap-2">
                <div className="border-2 border-border rounded-sm p-1 flex items-center justify-center">
                  <Icon icon={"mingcute:science-line"} className="text-2xl" />
                </div>
                <p className="text-md font-semibold">Catalyst</p>
              </div>
            </header>
            <main className=" flex-1 relative grid grid-cols-[20rem_1fr]">
              <aside
                aria-label="explorer-sidebar"
                className="bg-foreground border-r flex flex-col border-border p-4 pb-0"
              >
                <ExplorerHeader />
                <FileExplorer />
              </aside>
              <WorkspaceLayout />
            </main>
          </div>
        </div>
      </DialogProvider>
    </ToastProvider>
  );
}
