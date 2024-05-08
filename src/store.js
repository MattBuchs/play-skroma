import { configureStore } from "@reduxjs/toolkit";
import checkersSettings from "./features/checkersSettings";

export const store = configureStore({
    reducer: {
        checkersSettings,
    },
});
