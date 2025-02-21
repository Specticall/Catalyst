import { AxiosResponse } from "axios";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SuccessReponse } from "./types";
import Cookies from "js-cookie";

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

export function capitalize(str?: string) {
  if (!str) return undefined;
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function getWorkspaceId() {
  return Cookies.get("workspaceId")
    ? Number(Cookies.get("workspaceId"))
    : undefined;
}
