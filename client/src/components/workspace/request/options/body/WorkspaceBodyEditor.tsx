import "@/css/jsoneditor.css";
import WorkspaceBodyOptsPopover from "./WorkspaceBodyOptsPopover";
import WorkspaceJSONEditor from "./WorkspaceJSONEditor";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/lib";
import useRequestManager from "@/hooks/managers/useRequestManager";

export default function WorkspaceBodyEditor() {
  const { requestQuery, isInvalidJSON } = useRequestManager();
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-end ">
        <WorkspaceBodyOptsPopover />
        <div
          className={cn(
            "text-red-400 bg-red-700/10 px-4  py-2 rounded-md border border-red-400 flex gap-2 items-center transition-all duration-100 translate-y-2 invisible opacity-0",
            isInvalidJSON && "visible opacity-100 translate-y-0"
          )}
        >
          <Icon
            icon={"material-symbols:error-outline-rounded"}
            className="text-xl"
          />
          Invalid JSON format in the body
        </div>
      </div>
      {requestQuery.isLoading ? (
        <div className="flex-1 mt-4 h-full">
          <Skeleton className=" h-full block" containerClassName="h-full" />
        </div>
      ) : (
        <div className="flex-1 mt-4 rounded-md py-3 border border-border overflow-hidden">
          <WorkspaceJSONEditor />
        </div>
      )}
    </div>
  );
}
