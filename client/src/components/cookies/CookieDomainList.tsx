import useCookieMutation from "@/hooks/mutation/useCookieMutation";
import { cn } from "@/utils/lib";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Icon } from "@iconify/react/dist/iconify.js";
import useCookieEditor from "@/stores/cookieEditorStore";

type Props = {
  cookies?: { name: string; id: number }[];
  domain: string;
  collectionId: string;
};

export default function CookieDomainList({
  cookies,
  domain,
  collectionId,
}: Props) {
  const { activeDomain, selectedId, selectCookie } = useCookieEditor();
  const { deleteMutation } = useCookieMutation();

  return (
    <div className="text-secondary grid gap-2 ml-4 border-l border-border pl-4 py-4">
      {cookies?.map((cookie, j) => {
        return (
          <div
            key={j}
            className={cn(
              "py-2 px-5  rounded-sm hover:bg-highlight/50 cursor-pointer transition duration-50 flex items-center justify-between group",
              selectedId === cookie.id && "bg-highlight text-white"
            )}
            onClick={() => selectCookie(domain, cookie.id)}
          >
            {cookie.name}
            {deleteMutation.variables?.cookieId === cookie.id &&
            deleteMutation.isPending ? (
              <LoadingSpinner />
            ) : (
              <Icon
                icon={"material-symbols:close-rounded"}
                className="opacity-0 group-hover:opacity-100 transition duration-50 cursor-pointer hover:text-red-400"
                onClick={() =>
                  deleteMutation.mutate({
                    cookieId: cookie.id,
                    collectionId,
                  })
                }
              />
            )}
          </div>
        );
      })}
      <div
        className={cn(
          "py-2 px-5 bg-black/10 rounded-sm hover:bg-highlight trantition cursor-pointer duration-50",
          domain === activeDomain && !selectedId && "bg-highlight text-white"
        )}
        onClick={() => {
          selectCookie(domain, undefined);
        }}
      >
        + Add Cookies
      </div>
    </div>
  );
}
