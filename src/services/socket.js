import { io } from "socket.io-client";

let socket;

export const initializeSocket = (namespace) => {
    if (socket) socket.disconnect();

    socket = io(`http://localhost:1234/${namespace}`, {
        auth: {
            token: localStorage.getItem("user"),
        },
    });

    return socket;
};

export const getSocket = () => {
    return socket;
};
