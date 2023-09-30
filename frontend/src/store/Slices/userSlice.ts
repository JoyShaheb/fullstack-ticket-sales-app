import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userUid: string;
  // userRole: "admin" | "user";
}

const initialState: UserState = {
  userUid: "",
  // userRole: "user",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
