import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/userService";

// Initialisation de l'état
const initialState: UserData = {
  firstName: "",
  lastName: "",
  birthDate: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action pour mettre à jour une partie des données de l'utilisateur
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      // Modification directe de l'état
      Object.assign(state, action.payload);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;