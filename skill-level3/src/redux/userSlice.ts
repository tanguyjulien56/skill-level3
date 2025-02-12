import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserState } from "../types/userService";

const initialState: UserState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  image: "",
  daysToBirthday: "Date d'anniversaire invalide",
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      return { ...state, ...action.payload };
    },
    setUserImage: (state, action: PayloadAction<string | undefined>) => {
      state.image = action.payload;
    },
    setDaysToBirthday: (state, action: PayloadAction<number | string>) => {
      state.daysToBirthday = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  updateUser,
  setUserImage,
  setDaysToBirthday,
  setError,
  setLoading,
} = userSlice.actions;
export default userSlice.reducer;
