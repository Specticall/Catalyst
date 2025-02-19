import { HttpMethod, Request } from "@prisma/client";

const defaultHeaders = [
  {
    key: "Content-Type",
    value: "application/json",
    id: "default-1",
    enabled: true,
  },
  { key: "Accept", value: "*/*", id: "default-2", enabled: true },
  { key: "Authorization", value: "", id: "default-3", enabled: true },
];

export function createDefaultRequests(requestId: string) {
  return {
    body: "",
    id: requestId,
    method: "GET" as HttpMethod,
    name: "New Request",
    url: "",
    headers: defaultHeaders,
  };
}
