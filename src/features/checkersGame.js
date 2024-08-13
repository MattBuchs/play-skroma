import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameID: null,
    onlineMode: null,
};

export const checkersGame = createSlice({
    name: "checkersGame",
    initialState,
    reducers: {
        setGameID: (state, action) => {
            state.gameID = action.payload;
        },
        setOnlineMode: (state, action) => {
            state.gameMode = action.payload;
        },
    },
});

export const { setGameID, setOnlineMode } = checkersGame.actions;
export default checkersGame.reducer;
