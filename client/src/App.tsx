import FileExplorer from "./components/sidebar/explorer/Explorer";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-base">
      <div className="min-h-screen flex flex-col">
        <header className="py-3 bg-foreground px-4 border-b border-border">
          Content
        </header>
        <main className=" flex-1 relative grid grid-cols-[20rem_1fr]">
          <aside className="bg-foreground border-r border-border p-4">
            <FileExplorer />
          </aside>

          <section className="overflow-auto absolute inset-0 left-[20rem] px-4 mt-14 flex flex-col">
            <div className=" rounded-md flex-1 min-w-[50rem]"></div>
          </section>
        </main>
      </div>
    </div>
  );
}
