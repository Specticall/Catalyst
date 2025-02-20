import { Icon } from "@iconify/react/dist/iconify.js";
import { useDialogContext } from "../ui/Dialog";
import { CookieDialogContext } from "@/hooks/managers/useRequestManager";
import CookieViewer from "./CookieViewer";
import CookiesForm from "./CookiesForm";
import { useEffect } from "react";
import useCookieEditor from "@/stores/cookieEditorStore";

export default function CookiesDialog() {
  const { collectionNode } = useDialogContext<CookieDialogContext>();
  const store = useCookieEditor();

  // Resets the store when the cooke changes
  // Since we're persisting the selections when the dialog closes, to prevent stale data when opening a new window, we need to compare its collection id to the one inside the store
  useEffect(() => {
    if (collectionNode.id !== store.collectionId) {
      // Collection has changed!
      store.reset();
      store.setCollectionId(collectionNode.id);
    }
  }, [collectionNode, store]);

  return (
    <div className="bg-base w-full max-w-[70rem] rounded-lg my-16 border border-white/15 ">
      <div className="border-b border-border px-8 py-6">
        <div className="flex gap-4 items-center">
          <h2 className="text-white text-2xl">Collection Cookies</h2>
          <div className="flex border-border rounded-full text-white border px-4 py-1 gap-2">
            <Icon icon={"bx:collection"} className="text-xl" />
            <p>{collectionNode.title}</p>
          </div>
        </div>
        <p className="mt-1 text-secondary">
          Configure your cookies for the entire collection
        </p>
      </div>
      <div className="grid grid-cols-2">
        <CookieViewer />
        <CookiesForm />
      </div>
    </div>
  );
}
