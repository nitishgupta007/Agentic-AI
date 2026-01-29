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
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.name;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.token = a.payload.access_token;
        s.user = a.payload.name;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
