import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./slices/project/projectSlice";
import authSlice from "./slices/auth/authSlice";
import uiSlice from "./slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
    ui: uiSlice
  }
})