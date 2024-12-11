import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice.js";
import authReducer from "./auth.slice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
  },
});
