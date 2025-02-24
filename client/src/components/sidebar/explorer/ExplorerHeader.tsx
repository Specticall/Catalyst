import { Icon } from "@iconify/react/dist/iconify.js";
import useExplorerManager from "@/hooks/managers/useExplorerManager";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function ExplorerHeader() {
  const { insertCollection, search } = useExplorerManager();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search Collections..."
        className="bg-base border-border border px-5 py-2 rounded-sm focus:border-primary outline-none text-secondary w-full"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button
        className="bg-base/50 w-12 aspect-square flex items-center justify-center border-border rounded-sm border p-1.5 hover:opacity-60 transition cursor-pointer"
        onClick={insertCollection}
        aria-label="add-collection"
      >
        <Icon icon={"material-symbols:add"} className="text-xl text-primary " />
      </button>
    </div>
  );
}
