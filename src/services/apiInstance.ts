import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { removeUserFromLocalStorage } from "../lib/helpers";
import useUserStore from "../hooks/store/userStore";

const LOCAL_DEV_BASE_URL = "http://localhost:8080/api/v1";
const DEFAULT_PROD_BASE_URL = "https://monkfish-app-en3sj.ondigitalocean.app/api/v1";

type EnvLike = Record<string, string | undefined>;
type LocationLike = { hostname?: string };

export const resolveApiBaseUrl = (
  env: EnvLike = import.meta.env,
  location: LocationLike | undefined = typeof window !== "undefined" ? window.location : undefined
) => {
  const configuredUrl = env.VITE_API_BASE_URL || env.VITE_DEV_BASE_URL;

  if (configuredUrl) {
    return configuredUrl;
  }

  const hostname = location?.hostname?.toLowerCase() || "";

  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local")) {
    return LOCAL_DEV_BASE_URL;
  }

  return DEFAULT_PROD_BASE_URL;
};

const API_BASE_URL = resolveApiBaseUrl();

export const BASE_URL = API_BASE_URL;

export const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

//REQUEST interceptor
apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//RESPONSE interceptor (safe)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);

    if (error.response?.status === 401) {
      removeUserFromLocalStorage();
      useUserStore.getState().clearAuth();
    }

    return Promise.reject(error);
  }
);
