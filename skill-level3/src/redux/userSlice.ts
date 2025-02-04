import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/UserData";

const initialState: UserData = {
  firstName: "",
  lastName: "",
  birthDate: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
