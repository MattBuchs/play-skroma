import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameID: null,
    gameMode: null,
};

export const checkersGame = createSlice({
    name: "checkersGame",
    initialState,
    reducers: {
        setGameID: (state, action) => {
            state.gameID = action.payload;
        },
    },
});

export const { setGameID } = checkersGame.actions;
export default checkersGame.reducer;
