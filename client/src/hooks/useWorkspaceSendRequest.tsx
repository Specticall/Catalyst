import useRequestStore from "@/stores/requestStore";
import useRequestQuery from "./queries/useRequestQuery";
import useExplorerManager from "./managers/useExplorerManager";
import { isValidJSON } from "@/utils/lib";
import { ProxyServerResponse, SuccessReponse, Workspace } from "@/utils/types";
import { API } from "@/utils/API";
import { Explorer } from "@/utils/Explorer";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

export default function useWorkspaceSendRequest() {
  const { selectedNode } = useExplorerManager();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });
  const { setResponseData, setIsLoadingResponse, setIsInvalidJSON } =
    useRequestStore();
  const queryClient = useQueryClient();

  const workspace = queryClient.getQueryData<Workspace>([QUERY_KEYS.WORKSPACE]);

  const sendRequest = async () => {
    try {
      if (!workspace) return;
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

      const response = await API.post<SuccessReponse<ProxyServerResponse>>(
        "/proxy",
        {
          requestData: data,
          collectionId: Explorer.findCollectionParent(
            workspace.explorer,
            data.id
          )?.id,
        }
      );
      const responseData = response.data.data;
      setResponseData(responseData);
    } catch (err) {
      // SOMETHING WENT WRONG WITH THE PROXY SERVER (TODO)
      console.log("SOMETHING WENT WRONG WITH THE PROXY SERVER", err);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  return sendRequest;
}
