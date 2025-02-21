import useRequestQuery from "../queries/useRequestQuery";
import useRequestMutation from "../mutation/useRequestMutation";
import useWorkspaceSendRequest from "../useWorkspaceSendRequest";
import useRequestStore from "@/stores/requestStore";
import { isValidJSON } from "@/utils/lib";
import { useDialog } from "@/components/ui/Dialog";
import { dialogs } from "@/App";
import { HistoryNode } from "@/context/explorer/explorerTypes";
import { Explorer } from "@/utils/Explorer";
import useExplorerManager from "./useExplorerManager";
import { Workspace } from "@/utils/types";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

export const requestOptionsData = [
  "Body",
  "Headers",
  // "Params",
  // "Cookies",
] as const;

export type CookieDialogContext = {
  collectionNode: HistoryNode;
};

export type RequestOptions = (typeof requestOptionsData)[number];

export default function useRequestManager() {
  const store = useRequestStore();
  const { selectedNode } = useExplorerManager();
  const sendRequest = useWorkspaceSendRequest();
  const { updateRequestOptimistically } = useRequestMutation();
  const dialog = useDialog<typeof dialogs>();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });
  const queryClient = useQueryClient();

  const changeURL = (url: string) => {
    if (!selectedNode?.id) return;
    updateRequestOptimistically((current) => {
      return { ...current, url };
    }, selectedNode?.id);
  };

  const changeBody = (json: string) => {
    if (!selectedNode?.id) return;
    // Re-check json formatting if an error was previously encountered
    if (store.isInvalidJSON) {
      store.setIsInvalidJSON(isValidJSON(json));
    }
    updateRequestOptimistically((current) => {
      return { ...current, body: json };
    }, selectedNode?.id);
  };

  const openCookieConfiguration = () => {
    const workspace = queryClient.getQueryData<Workspace>([
      QUERY_KEYS.WORKSPACE,
    ]);
    if (!workspace || !selectedNode) return;

    const collectionNode = Explorer.findCollectionParent(
      workspace.explorer,
      selectedNode?.id
    );
    if (!collectionNode) return;
    dialog.open("cookie", {
      collectionNode,
    } satisfies CookieDialogContext);
  };

  return {
    ...requestQuery.data,
    ...store,
    requestQuery,
    changeURL,
    changeBody,
    sendRequest,
    openCookieConfiguration,
  };
}
