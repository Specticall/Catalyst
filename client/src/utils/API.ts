import { BASE_URL } from "@/config/config";
import axios from "axios";

export const API = axios.create({
  baseURL: BASE_URL as string,
  withCredentials: true,
});
