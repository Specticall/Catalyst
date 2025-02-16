import { requestOptionsData } from "@/context/workspace/WorkspaceProvider";
import { RequestOptions } from "@/hooks/managers/useRequestManager";
import { cn } from "@/utils/lib";

type Props = {
  setActive: (value: RequestOptions) => void;
  active: RequestOptions;
};

export default function WorkspaceOptionsSelector({ setActive, active }: Props) {
  return (
    <ul className="flex border-b border-border mt-3 mx-4">
      {requestOptionsData.map((opt, i) => {
        return (
          <li
            onClick={() => setActive(opt)}
            className={cn(
              "relative text-secondary px-6 py-2 rounded-t-md cursor-pointer hover:text-white transition duration-50",
              active === opt && "text-white bg-highlight "
            )}
            key={i}
          >
            {opt}
            {active === opt && (
              <div className="absolute bottom-0 left-0 right-0 bg-accent h-0.5"></div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
