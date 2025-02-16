import useRequestStore from "@/stores/requestStore";
import useRequestQuery from "./queries/useRequestQuery";
import useExplorerManager from "./managers/useExplorerManager";
import axios, { isAxiosError, RawAxiosRequestHeaders } from "axios";
import { isValidJSON } from "@/utils/lib";
import { Request } from "@/utils/types";

function serializeHeaders(headers: Request["headers"]) {
  return headers.reduce((res: Record<string, unknown>, cur) => {
    if (!cur.key) return res;
    if (cur.enabled) {
      res[cur.key] = cur.value;
    }
    return res;
  }, {}) as RawAxiosRequestHeaders;
}

export default function useWorkspaceSendRequest() {
  const { selectedNode } = useExplorerManager();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });
  const {
    setResponseData,
    setResponseError,
    setIsLoadingResponse,
    setIsInvalidJSON,
  } = useRequestStore();

  const sendRequest = async () => {
    try {
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

      const response = await axios({
        url: data.url,
        data: data.body ? JSON.parse(data.body) : undefined,
        method: data.method,
        headers: serializeHeaders(data.headers),
      });
      setResponseData(response.data);
      setResponseError(undefined);
    } catch (err) {
      if (isAxiosError(err)) {
        setResponseError(err.response?.data || err.response);
      }
      setResponseData(undefined);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  return sendRequest;
}
