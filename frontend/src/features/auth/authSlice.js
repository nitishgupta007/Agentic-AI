import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { getToken } from "../../utils/tokenUtils";

const initialState = {
  user: null,
  token: getToken(),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail || "Invalid username or password"
      );
    }
  }
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
      state.error = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.name;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
