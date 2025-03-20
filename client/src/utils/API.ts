import { BASE_URL } from "@/config/config";
import axios from "axios";

export const API = axios.create({
  baseURL: BASE_URL as string,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const workspaceId = localStorage.getItem("workspaceId");
  if (workspaceId) {
    config.headers.workspaceId = workspaceId;
  }
  return config;
});
