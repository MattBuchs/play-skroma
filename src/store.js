import { configureStore } from "@reduxjs/toolkit";
import navbar from "./features/navbar";
import user from "./features/user";
import checkersSettings from "./features/checkers/checkersSettings";
import checkersGame from "./features/checkers/checkersGame";

export const store = configureStore({
    reducer: {
        navbar,
        user,
        checkersSettings,
        checkersGame,
    },
});
