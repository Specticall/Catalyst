import useExplorerStore from "@/stores/explorerStore";
import useRequestQuery from "../queries/useRequestQuery";
import useRequestMutation from "../mutation/useRequestMutation";
import useWorkspaceSendRequest from "../useWorkspaceSendRequest";
import useRequestStore from "@/stores/requestStore";
import { isValidJSON } from "@/utils/lib";

export const requestOptionsData = [
  "Body",
  "Headers",
  // "Params",
  // "Cookies",
] as const;

export type RequestOptions = (typeof requestOptionsData)[number];

export default function useRequestManager() {
  const store = useRequestStore();
  const { selectedNode } = useExplorerStore();
  const sendRequest = useWorkspaceSendRequest();
  const { updateRequestOptimistically } = useRequestMutation();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });

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

  return {
    ...requestQuery.data,
    ...store,
    requestQuery,
    changeURL,
    changeBody,
    sendRequest,
  };
}
