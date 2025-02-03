import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  firstName: string;
  lastName: string;
  birthDate: string | null; // Date de naissance qui peut être null
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  birthDate: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      // Mise à jour partielle de l'état du formulaire
      return { ...state, ...action.payload };
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
