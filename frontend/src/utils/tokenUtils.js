import {jwtDecode} from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    removeToken();
    return null;
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
