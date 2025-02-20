import Button from "@/components/ui/Button";
import { requestOptionsData } from "@/context/workspace/WorkspaceProvider";
import useRequestManager, {
  RequestOptions,
} from "@/hooks/managers/useRequestManager";
import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  setActive: (value: RequestOptions) => void;
  active: RequestOptions;
};

export default function WorkspaceOptionsSelector({ setActive, active }: Props) {
  const { openCookieConfiguration } = useRequestManager();
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
      <div className="flex flex-1 justify-end items-center">
        <Button
          variant={"hollow"}
          className="flex gap-2 py-1.5 mb-2 px-4 rounded-full"
          onClick={openCookieConfiguration}
        >
          <Icon
            icon="material-symbols:cookie-outline"
            className="text-xl text-secondary"
          />
          View Cookies
        </Button>
      </div>
    </ul>
  );
}
