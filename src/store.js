import { configureStore } from "@reduxjs/toolkit";
import checkersSettings from "./features/checkersSettings";
import checkersGame from "./features/checkersGame";

export const store = configureStore({
    reducer: {
        checkersSettings,
        checkersGame,
    },
});
