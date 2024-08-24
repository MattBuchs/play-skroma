import { configureStore } from "@reduxjs/toolkit";
import navbar from "./features/navbar";
import checkersSettings from "./features/checkersSettings";
import checkersGame from "./features/checkersGame";

export const store = configureStore({
    reducer: {
        navbar,
        checkersSettings,
        checkersGame,
    },
});
