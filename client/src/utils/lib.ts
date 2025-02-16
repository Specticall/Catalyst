import { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SuccessReponse } from "./types";
import { Request } from "./types";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}

export function isValidJSON(json: string) {
  try {
    if (json === "") return true;
    return Boolean(JSON.parse(json));
  } catch {
    return false;
  }
}

export function safelyParseJSON(json?: string): unknown {
  try {
    if (!json) return {};
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function simulateAxiosResponse<T = unknown>(
  data: T
): AxiosResponse<SuccessReponse<T>> {
  return {
    data: {
      data: data,
    },
  } as AxiosResponse<SuccessReponse<T>>;
}
