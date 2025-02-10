import { Icon } from "@iconify/react/dist/iconify.js";
import { useExplorer } from "./Explorer";

export default function ExplorerHeader() {
  const { dispatch } = useExplorer();

  const handleAddCollection = () => {
    dispatch({
      type: "insert/collection",
    });
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
