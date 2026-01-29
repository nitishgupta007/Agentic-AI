import axios from "axios";
import { getToken, removeToken } from "../utils/tokenUtils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
