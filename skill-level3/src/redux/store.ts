import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer, // Ajout du reducer du formulaire
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
