import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum ThemeTypesEnum {
  DARK = "dark",
  LIGHT = "light",
}

interface ISystemSliceProps {
  mode: ThemeTypesEnum.LIGHT | ThemeTypesEnum.DARK;
}

const initialState: ISystemSliceProps = {
  mode: ThemeTypesEnum.DARK,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    themeSwitch: (
      state: ISystemSliceProps,
      action: PayloadAction<ThemeTypesEnum.LIGHT | ThemeTypesEnum.DARK>
    ) => {
      state.mode = action.payload;
    },
    resetSystem: () => initialState,
  },
});

export const { resetSystem, themeSwitch } = systemSlice.actions;
