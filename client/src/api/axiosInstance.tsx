import axios, { InternalAxiosRequestConfig } from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://62.217.180.248:8000/api",
});

AxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});
