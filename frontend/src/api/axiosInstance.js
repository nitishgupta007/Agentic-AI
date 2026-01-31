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
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || "";

    // 🚫 AUTH endpoints that must NOT trigger redirects
    const isAuthEndpoint =
      url.includes("/auth/login") ||
      url.includes("/auth/forgot-password");

    if (status === 401 && !isAuthEndpoint) {
      removeToken();

      // SPA-safe redirect
      if (window.location.pathname !== "/login") {
        window.history.replaceState({}, "", "/login");
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
