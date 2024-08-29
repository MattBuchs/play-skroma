import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ratingsShown: false,
};

export const checkersSettings = createSlice({
    name: "checkersSettings",
    initialState,
    reducers: {
        ratingsRatings: (state) => {
            state.ratingsShown = !state.ratingsShown;
        },
    },
});

export const { ratingsRatings } = checkersSettings.actions;
export default checkersSettings.reducer;
