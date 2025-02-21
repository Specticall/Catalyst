import ExplorerHeader from "@/components/sidebar/explorer/ExplorerHeader";
import WorkspaceLayout from "@/components/workspace/WorkspaceLayout";
import FileExplorer from "@/components/sidebar/explorer/Explorer";
import TopBar from "@/components/topbar/TopBar";

export default function Main() {
  return (
    <div className="min-h-screen w-full bg-base">
      <div className="min-h-screen flex flex-col">
        <TopBar />
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
  );
}
