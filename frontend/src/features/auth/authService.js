import axios from "../../api/axiosInstance";
import { setToken } from "../../utils/tokenUtils";

const login = async (data) => {
  const res = await axios.post("/auth/login", data);
  setToken(res.data.access_token);
  return res.data;
};

const signup = async (data) => {
  const res = await axios.post("/auth/signup", data);
  setToken(res.data.token);
  return res.data;
};

export default { login, signup };
