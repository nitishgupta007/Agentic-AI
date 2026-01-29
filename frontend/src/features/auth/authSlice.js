import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { getToken } from "../../utils/tokenUtils";

const initialState = {
  user: null,
  token: getToken(),
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  authService.login
);

export const signup = createAsyncThunk(
  "auth/signup",
  authService.signup
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, s => { s.loading = true })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.token = a.payload.token;
        s.user = a.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
