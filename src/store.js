import { configureStore } from "@reduxjs/toolkit";
import navbar from "./features/navbar";
import checkersSettings from "./features/checkers/checkersSettings";
import checkersGame from "./features/checkers/checkersGame";

export const store = configureStore({
    reducer: {
        navbar,
        checkersSettings,
        checkersGame,
    },
});
