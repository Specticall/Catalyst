import { useCallback, useMemo } from "react";
import useExplorerMutation from "../mutation/useExplorerCreateMutation";
import {
  ExplorerTreeNode,
  HTTPMethods,
} from "@/components/sidebar/explorer/explorerTree";
import { AxiosError, AxiosResponse } from "axios";
import { v4 as getUUID } from "uuid";
import { Explorer } from "@/utils/Explorer";
import {
  ExplorerActions,
  ExplorerState,
  HistoryNode,
} from "@/context/explorer/explorerTypes";
import useRequestMutation from "../mutation/useRequestMutation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { simulateAxiosResponse } from "@/utils/lib";
import { SuccessReponse, Workspace } from "@/utils/types";

export type ExplorerUpdater = ReturnType<typeof useExplorerUpdater>;

/**
 * @description Handles logic optimistically for updating the explorer both at the server and at the client.
 *
 * This function contains extraced reducer logic that handles explorer updates e.g. insert/request, insert/collection, etc... The code rans synchronously before a request is sent to the server
 *
 * The reason for this refactor is because we can't have fetch / mutation calls inside the reducer
 */
export default function useExplorerUpdater({
  dispatch,
  state,
}: {
  dispatch: React.ActionDispatch<[action: ExplorerActions]>;
  state: ExplorerState;
}) {
  const queryClient = useQueryClient();
  const { explorerUpdateMutation } = useExplorerMutation();
  const { createRequestMutation } = useRequestMutation();
  const updateServerSideExplorer = useCallback(
    async (data: ExplorerTreeNode[]) => {
      try {
        await explorerUpdateMutation.mutateAsync({
          explorer: data,
        });
      } catch (err) {
        console.log((err as AxiosError).response?.data);
      }
    },
    [explorerUpdateMutation]
  );

  const updateTreeState = useCallback(
    async (newTree: ExplorerTreeNode[], newNode: ExplorerTreeNode) => {
      const newHistory = [...state.history, newNode];
      dispatch({
        type: "insert/tree/all",
        payload: { newHistory, newTree: newTree, newNode: newNode },
      });

      await updateServerSideExplorer(newTree);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACE] });
    },
    [dispatch, queryClient, updateServerSideExplorer, state.history]
  );

  const explorer = useMemo(() => {
    return {
      insert: {
        /**
         * Insert request node
         * @param targetId parent node id of the new node
         */
        request: async (targetId: string) => {
          const newNode: ExplorerTreeNode = {
            type: "request",
            httpMethod: "GET",
            id: getUUID(),
            title: "New Request",
          };
          const newTree = Explorer.insertNode(state.tree, targetId, newNode);
          await createRequestMutation.mutateAsync(newNode.id);
          await updateTreeState(newTree, newNode);
        },
        /**
         * Insert collection node
         */
        collection: () => {
          const newNode: ExplorerTreeNode = {
            type: "collection",
            id: getUUID(),
            isOpen: true,
            title: "New Collection",
            children: [],
          };
          const newTree: ExplorerTreeNode[] = [...state.tree, newNode];
          updateTreeState(newTree, newNode);
        },
        /**
         * Insert group node
         * @param targetId parent node id of the new node
         */
        group: (targetId: string) => {
          const newNode: ExplorerTreeNode = {
            type: "group",
            id: getUUID(),
            isOpen: true,
            title: "New Group",
            children: [],
          };
          const newTree: ExplorerTreeNode[] = Explorer.insertNode(
            state.tree,
            targetId,
            newNode
          );
          updateTreeState(newTree, newNode);
        },
      },
      update: {
        /**
         * Updates the tree HTTP Method
         */
        method: (targetId: string, newMethod: HTTPMethods) => {
          const newTree: ExplorerTreeNode[] = Explorer.changeNodeMethod(
            state.tree,
            targetId,
            newMethod
          );
          const newHistory: HistoryNode[] = state.history.map((hist) => {
            return hist.id === state.selectedId
              ? { ...hist, httpMethod: newMethod }
              : hist;
          });
          dispatch({
            type: "update/tree/all",
            payload: { newTree, newHistory },
          });
        },
        name: (targetId: string, newName: string) => {
          const newTree: ExplorerTreeNode[] = Explorer.changeNodeName(
            state.tree,
            targetId,
            newName
          );
          const newHistory: HistoryNode[] = state.history.map((hist) => {
            return hist.id === state.selectedId
              ? { ...hist, title: newName }
              : hist;
          });
          dispatch({
            type: "update/tree/all",
            payload: { newTree, newHistory },
          });
        },
      },
    };
  }, [
    state.tree,
    dispatch,
    createRequestMutation,
    state.history,
    state.selectedId,
    updateTreeState,
  ]);

  return explorer;
}
