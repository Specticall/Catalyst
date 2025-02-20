import { Icon } from "@iconify/react/dist/iconify.js";
import FileExplorer from "./components/sidebar/explorer/Explorer";
import WorkspaceLayout from "./components/workspace/WorkspaceLayout";
import ExplorerHeader from "./components/sidebar/explorer/ExplorerHeader";
import { DialogComponents, DialogProvider } from "./components/ui/Dialog";
import CookiesDialog from "./components/cookies/CookiesDialog";
import ToastProvider from "./components/ui/Toast";
import Header from "./components/header/Header";

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
            <Header />
            <main className=" flex-1 relative grid grid-cols-[22.5rem_1fr]">
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
