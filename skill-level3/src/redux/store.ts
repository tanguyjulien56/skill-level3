import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer, // Utilisation du rootReducer combinant form et user
});

export type RootState = ReturnType<typeof store.getState>; // Type pour accéder à l'état
export default store;
