import {
  requestOptionsData,
  useWorkspace,
} from "@/context/workspace/WorkspaceProvider";
import { cn } from "@/utils/lib";

export default function WorkspaceOptionsSelector() {
  const {
    state: { activeOption },
    dispatch,
  } = useWorkspace();
  return (
    <ul className="flex border-b border-border mt-4 mx-4">
      {requestOptionsData.map((opt, i) => {
        return (
          <li
            onClick={() => dispatch({ type: "change/options", payload: opt })}
            className={cn(
              "relative text-secondary px-6 py-2 rounded-t-md cursor-pointer hover:text-white transition duration-50",
              activeOption === opt && "text-white bg-highlight "
            )}
            key={i}
          >
            {opt}
            {activeOption === opt && (
              <div className="absolute bottom-0 left-0 right-0 bg-accent h-0.5"></div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
