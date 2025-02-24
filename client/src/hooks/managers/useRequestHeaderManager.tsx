import useExplorerStore from "@/stores/explorerStore";
import useRequestMutation from "../mutation/workspace/useRequestMutation";
import useRequestQuery from "../queries/workspace/useRequestQuery";
import { v4 } from "uuid";

export default function useRequestHeaderManager() {
  const { selectedNode } = useExplorerStore();
  const { updateRequestOptimistically } = useRequestMutation();
  const requestQuery = useRequestQuery({
    requestId: selectedNode?.id,
  });

  const changeHeader = ({
    id,
    key,
    value,
  }: {
    id: string;
    key: string;
    value: string | boolean;
  }) => {
    if (!requestQuery.data || !selectedNode?.id) return;
    const updatedHeader = requestQuery.data.headers.map((header) => {
      return header.id === id ? { ...header, [key]: value } : header;
    });
    updateRequestOptimistically((current) => {
      return {
        ...current,
        headers: updatedHeader,
      };
    }, selectedNode?.id);
  };

  // User can either initially input a key or a value
  const insertHeader = ({ key, value }: { key?: string; value?: string }) => {
    if (!selectedNode?.id || !requestQuery.data) return;
    const newHeaders = {
      key: key || "",
      value: value || "",
      enabled: false,
      id: v4(),
    };

    updateRequestOptimistically((current) => {
      return {
        ...current,
        headers: [...(current.headers || []), newHeaders],
      };
    }, selectedNode.id);
  };

  const deleteHeaderRow = (id: string) => {
    if (!selectedNode?.id) return;
    updateRequestOptimistically(
      (current) => ({
        ...current,
        headers: current.headers.filter((header) => header.id !== id),
      }),
      selectedNode.id
    );
  };

  return {
    insertHeader,
    changeHeader,
    deleteHeaderRow,
    headers: requestQuery.data?.headers,
  };
}
