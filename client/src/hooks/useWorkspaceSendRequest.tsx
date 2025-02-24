import useRequestStore from "@/stores/requestStore";
import useRequestQuery from "./queries/workspace/useRequestQuery";
import useExplorerManager from "./managers/useExplorerManager";
import { isValidJSON } from "@/utils/lib";
import { ProxyServerResponse, SuccessReponse, Workspace } from "@/utils/types";
import { API } from "@/utils/API";
import { Explorer } from "@/utils/Explorer";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast";
import { isAxiosError } from "axios";
import useWorkspaceStore from "@/stores/workspaceStore";

export default function useWorkspaceSendRequest() {
  const { selectedNode } = useExplorerManager();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });
  const {
    setResponseData,
    setIsLoadingResponse,
    setAbortController,
    setIsInvalidJSON,
  } = useRequestStore();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { workspaceId } = useWorkspaceStore();

  const sendRequest = async () => {
    try {
      const workspace = queryClient.getQueryData<Workspace>([
        QUERY_KEYS.WORKSPACE,
        workspaceId,
      ]);
      if (!workspace || !requestQuery.data?.url) return;
      setIsLoadingResponse(true);
      setIsInvalidJSON(false);
      const data = requestQuery.data;

      if (!data) return;

      // Check JSON validity for requets other than "GET" or "DELETE",
      // we're allowing invalid json to be sent because both request with these methods ignores the body in the first place

      if (
        !isValidJSON(data.body) &&
        data.method !== "GET" &&
        data.method !== "DELETE"
      ) {
        setIsInvalidJSON(true);
        return;
      }

      const abortController = new AbortController();
      setAbortController(abortController);

      const response = await API.post<SuccessReponse<ProxyServerResponse>>(
        "/proxy",
        {
          requestData: data,
          // Collection Id is needed for cookie storage purposes
          collectionId: Explorer.findCollectionParent(
            workspace.explorer,
            data.id
          )?.id,
        },
        {
          signal: abortController.signal,
        }
      );
      const responseData = response.data.data;
      if (selectedNode?.id) {
        sessionStorage.setItem(selectedNode?.id, JSON.stringify(responseData));
      }
      setResponseData(responseData);
    } catch (err) {
      if (!isAxiosError(err)) return;
      if (err.code === "ERR_CANCELED") {
        toast.success("Request cancelled");
      } else {
        toast.error("Something went wrong with the proxy server");
        console.log(err);
      }
    } finally {
      setIsLoadingResponse(false);
    }
  };

  return sendRequest;
}
