import useCookiesQuery, {
  CompactCookie,
} from "@/hooks/queries/useCookiesQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import EditableText from "../ui/EditableText";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import CookieDomainList from "./CookieDomainList";
import useCookieEditor from "@/stores/cookieEditorStore";
import Skeleton from "react-loading-skeleton";

export default function CookieViewer() {
  const { addTemporaryDomainName, temporaryDomainName, collectionId } =
    useCookieEditor();
  const { data } = useCookiesQuery({ collectionId });
  const queryClient = useQueryClient();

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
    addTemporaryDomainName(domainName);
  };

  if (!data) {
    return (
      <div className="relative p-8 border-border h-fit border-r">
        <div className="absolute z-50 inset-0  bg-gradient-to-t from-base to-transparent"></div>
        {new Array(7).fill("x").map((_, i) => {
          return <Skeleton key={i} className="w-full h-12 mt-4" />;
        })}
      </div>
    );
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
          <CookieDomainList
            collectionId={collectionId}
            cookies={cookies}
            domain={domain}
          />
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
