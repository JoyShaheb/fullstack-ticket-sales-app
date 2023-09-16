import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
    searchTerm: string;
}

const initialState: SearchState = {
    searchTerm: "",
};

export const searchSlice = createSlice({
    name: "searchTerm",
    initialState,
    reducers: {
        changeSearchTerm: (state, action: PayloadAction<SearchState>) => {
            state.searchTerm = action.payload.searchTerm;
        },
        resetSearchTerm: () => initialState,
    },
});

export const { changeSearchTerm, resetSearchTerm } = searchSlice.actions;
