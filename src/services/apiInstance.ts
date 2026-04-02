import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { removeUserFromLocalStorage } from "../lib/helpers";
import useUserStore from "../hooks/store/userStore";

const { VITE_DEV_BASE_URL } = import.meta.env;

export const BASE_URL = VITE_DEV_BASE_URL;

export const apiInstance: AxiosInstance = axios.create({
  baseURL: VITE_DEV_BASE_URL,
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
