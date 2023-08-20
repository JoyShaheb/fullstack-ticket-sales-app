import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  address: string;
  phoneNumber: string;
  userRole: "admin" | "user";
  token: string;
}

const initialState: UserState = {
  id: "",
  address: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  profilePicture: "",
  userRole: "user",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.profilePicture = action.payload.profilePicture;
      state.userRole = action.payload.userRole;
      state.token = action.payload.token;
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
