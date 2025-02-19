import useCookiesQuery, {
  CompactCookie,
} from "@/hooks/queries/useCookiesQuery";
import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import EditableText from "../ui/EditableText";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useState } from "react";

type Props = {
  collectionId: string;
  selectedId?: number;
  onSelect: (domain: string, id?: number) => void;
  activeDomain?: string;
};

export default function CookieViewer({
  collectionId,
  selectedId,
  onSelect,
  activeDomain,
}: Props) {
  const { data } = useCookiesQuery({ collectionId });
  const [temporaryDomainName, setTemporaryDomainName] = useState(false);
  const queryClient = useQueryClient();

  const focusForm = () => {
    const el = document.querySelector("[data-cookie-name-input]") as
      | HTMLInputElement
      | undefined;
    if (!el) return;
    el.focus();
  };

  const addTemporaryDomain = (domainName: string) => {
    if (!domainName) return;
    queryClient.setQueryData<CompactCookie>(
      [QUERY_KEYS.COOKIES, collectionId],
      (current) => {
        return {
          ...current,
          [domainName]: [],
        };
      }
    );
    setTemporaryDomainName(true);
    onSelect(domainName, undefined);
    focusForm();
  };

  if (!data) {
    return <div></div>;
  }

  return (
    <ul className="border-border border-r p-8">
      {Object.entries(data).map(([domain, cookies], i) => (
        <li key={i}>
          <div className="text-primary text-lg border border-border px-4 py-2.5 rounded-md flex gap-3 items-center">
            <Icon
              icon="material-symbols:cookie-outline"
              className="text-2xl text-secondary"
            />
            {domain}
          </div>
          <div className="text-secondary grid gap-2 ml-4 border-l border-border pl-4 py-4">
            {cookies.map((cookies, j) => (
              <div
                key={j}
                className={cn(
                  "py-2 px-5  rounded-sm hover:bg-highlight/50 cursor-pointer transition duration-50",
                  selectedId === cookies.id && "bg-highlight text-white"
                )}
                onClick={() => onSelect(domain, cookies.id)}
              >
                {cookies.name}
              </div>
            ))}
            <div
              className={cn(
                "py-2 px-5 bg-black/10 rounded-sm hover:bg-highlight trantition cursor-pointer duration-50",
                domain === activeDomain &&
                  !selectedId &&
                  "bg-highlight text-white"
              )}
              onClick={() => {
                onSelect(domain, undefined);
                focusForm();
              }}
            >
              + Add Cookies
            </div>
          </div>
        </li>
      ))}
      {!temporaryDomainName && (
        <div className="text-primary text-lg border border-border px-4 py-2.5 rounded-md flex gap-3 items-center">
          <Icon
            icon="material-symbols:add-rounded"
            className="text-2xl text-secondary"
          />
          <EditableText
            placeholder="Add Domain"
            value=""
            onBlur={addTemporaryDomain}
            className="text-lg text-secondary min-w-24"
          />
        </div>
      )}
    </ul>
  );
}
