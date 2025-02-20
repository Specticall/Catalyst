import { ProxyServerResponse } from "@/utils/types";
import { create } from "zustand";

export const requestOptionsData = [
  "Body",
  "Headers",
  // "Params",
  // "Cookies",
] as const;

type RequestState = {
  responseData?: ProxyServerResponse;
  isLoadingResponse: boolean;
  isInvalidJSON: boolean;
  abortController?: AbortController;
  abortRequest: () => void;
  setResponseData: (data?: ProxyServerResponse) => void;
  setIsLoadingResponse: (value?: boolean) => void;
  setIsInvalidJSON: (value?: boolean) => void;
  setAbortController: (controller?: AbortController) => void;
};

const useRequestStore = create<RequestState>((set, get) => ({
  responseData: undefined,
  isLoadingResponse: false,
  isInvalidJSON: false,
  abortController: new AbortController(),
  setResponseData: (data) => set((cur) => ({ ...cur, responseData: data })),
  setIsLoadingResponse: (value) =>
    set((cur) => ({ ...cur, isLoadingResponse: value })),
  setIsInvalidJSON: (value) => set((cur) => ({ ...cur, isInvalidJSON: value })),
  abortRequest: () => {
    get().abortController?.abort();
    set((cur) => ({ ...cur, abortController: undefined }));
  },
  setAbortController: (controller) =>
    set((cur) => ({ ...cur, abortController: controller })),
}));

export default useRequestStore;
