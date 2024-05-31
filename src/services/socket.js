// src/socket.js
import { io } from "socket.io-client";

let socket;

export const initializeSocket = (namespace) => {
    if (!socket) {
        socket = io(`http://localhost:1234/${namespace}`);
    }
    return socket;
};

export const getSocket = () => {
    return socket;
};
