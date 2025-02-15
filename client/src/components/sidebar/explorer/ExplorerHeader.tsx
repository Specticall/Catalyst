import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "@/context/explorer/ExplorerProvider";

export default function ExplorerHeader() {
  const { explorer } = useExplorer();

  const handleAddCollection = () => {
    explorer.insert.collection();
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search Collections"
        className="bg-highlight px-5 py-2 rounded-sm text-secondary w-full"
      />
      <div className="mt-4 flex justify-between items-center border-b border-border pb-3">
        <p className="text-primary">My Collections</p>
        <button
          className="bg-base/50 border-border rounded-sm border p-1.5 hover:opacity-60 transition cursor-pointer"
          onClick={handleAddCollection}
          aria-label="add-collection"
        >
          <Icon
            icon={"material-symbols:add"}
            className="text-xl text-primary "
          />
        </button>
      </div>
    </>
  );
}
