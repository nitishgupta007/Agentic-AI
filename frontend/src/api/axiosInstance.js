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

    // ✅ Ignore login API
    if (status === 401 && !url.includes("/auth/login")) {
      removeToken();

      // ❌ no hard reload
      // ❌ no window.location.href

      // Optional soft redirect using SPA (best practice)
      if (window.location.pathname !== "/login") {
        window.history.pushState({}, "", "/login");
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
