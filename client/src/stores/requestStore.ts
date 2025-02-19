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
  // responseError?: AxiosError;
  isLoadingResponse: boolean;
  isInvalidJSON: boolean;
  setResponseData: (data?: ProxyServerResponse) => void;
  // setResponseError: (data?: AxiosError) => void;
  setIsLoadingResponse: (value?: boolean) => void;
  setIsInvalidJSON: (value?: boolean) => void;
};

const useRequestStore = create<RequestState>((set) => ({
  responseData: undefined,
  // responseError: undefined,
  isLoadingResponse: false,
  isInvalidJSON: false,
  setResponseData: (data) => set((cur) => ({ ...cur, responseData: data })),
  // setResponseError: (error) => set((cur) => ({ ...cur, responseError: error })),
  setIsLoadingResponse: (value) =>
    set((cur) => ({ ...cur, isLoadingResponse: value })),
  setIsInvalidJSON: (value) => set((cur) => ({ ...cur, isInvalidJSON: value })),
}));

export default useRequestStore;
