import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }

    return token;
  } catch (e) {
    removeToken();
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

