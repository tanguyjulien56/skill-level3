import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition du type pour l'état utilisateur
interface UserState {
  formData: {
    firstName: string;
    lastName: string;
    birthDate: string;
  };
}

const initialState: UserState = {
  formData: {
    firstName: "",
    lastName: "",
    birthDate: "",
  },
};

// Création du slice pour gérer l'utilisateur
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<typeof initialState.formData>
    ) => {
      state.formData = action.payload;
    },
  },
});

// Exportation du reducer et de l'action
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
