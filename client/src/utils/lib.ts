import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}

export function isValidJSON(json: string) {
  try {
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
