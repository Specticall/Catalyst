import ExplorerProvider from "./components/context/explorer/ExplorerProvider";
import { WorkspaceProvider } from "./components/context/workspace/WorkspaceProvider";
import FileExplorer from "./components/sidebar/explorer/Explorer";
import Workspace from "./components/workspace/Workspace";

export default function App() {
  return (
    <ExplorerProvider>
      <WorkspaceProvider>
        <div className="min-h-screen w-full bg-base">
          <div className="min-h-screen flex flex-col">
            <header className="py-3 bg-foreground px-4 border-b border-border">
              Content
            </header>
            <main className=" flex-1 relative grid grid-cols-[20rem_1fr]">
              <aside className="bg-foreground border-r border-border p-4">
                <FileExplorer />
              </aside>

              <section className="overflow-auto absolute inset-0 left-[20rem] flex flex-col">
                <Workspace />
              </section>
            </main>
          </div>
        </div>
      </WorkspaceProvider>
    </ExplorerProvider>
  );
}
