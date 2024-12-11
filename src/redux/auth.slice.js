import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000/api/auth";

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",

  userToken: localStorage.getItem("user-token") || null,
  userInfo: localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info"))
    : null,
  isAuthenticated: !!localStorage.getItem("user-token"),
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, credentials);
      const { user, token } = response.data.result;

      localStorage.setItem("user-info", JSON.stringify(user));
      localStorage.setItem("user-token", token);

      return { user, token };
    } catch (error) {
      const errorMsg =
        error.response?.status === 401 || 404
          ? "Identifiants invalides"
          : "Une erreur est survenue";
      return rejectWithValue(errorMsg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Réinitialisation de l'état
      state.userToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;

      // Nettoyage du localStorage
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-info");
      location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMsg = "";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user, token } = payload;

        state.isLoading = false;
        state.userInfo = user;
        state.userToken = token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = payload || "Une erreur est survenue";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
