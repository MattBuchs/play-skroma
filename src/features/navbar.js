import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDisplayNav: true,
};

export const navbar = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        displayNavbar: (state) => {
            state.isDisplayNav = true;
        },
        hideNavbar: (state) => {
            state.isDisplayNav = false;
        },
    },
});

export const { displayNavbar, hideNavbar } = navbar.actions;
export default navbar.reducer;
