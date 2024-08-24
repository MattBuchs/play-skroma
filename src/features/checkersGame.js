import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameID: null,
    onlineMode: null,
    isWinner: false,
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
        addWinner: (state) => {
            state.isWinner = true;
        },
        removeWinner: (state) => {
            state.isWinner = false;
        },
    },
});

export const { setGameID, setOnlineMode, addWinner, removeWinner } =
    checkersGame.actions;
export default checkersGame.reducer;
