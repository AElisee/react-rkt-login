import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000/api/auth";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  errorMsg: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMsg = "";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = payload || "Une erreur est survenue";
      });
  },
});

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, userData);
      const token = response.data.result;
      await axios.get(`${apiUrl}/confirmation/${token}`);
    } catch (error) {
      const errorMsg = "Une erreur est survenue";
      return rejectWithValue(errorMsg);
    }
  }
);

export default userSlice.reducer;
