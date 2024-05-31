import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../../services/socket";
import { setGameID } from "../../../features/checkersGame";
import { nanoid } from "nanoid";

const userId = localStorage.getItem("userId") || nanoid();
localStorage.setItem("userId", userId);
const socket = getSocket();

export default function JoinGameModal({ closeModal }) {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleJoinGame = (gameId) => {
        socket.emit("joinGame", { gameId, userId }, (response) => {
            if (response.success) {
                dispatch(setGameID(gameId));
                navigate(`/checkers/${gameId}`);
            } else {
                alert(response.message);
            }
        });
    };

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-400 text-slate-900 px-10 py-5 rounded relative mb-[8vh] w-[500px]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>

                <h2>Join a game</h2>
                <input type="text" onChange={(e) => setValue(e.target.value)} />
                <button onClick={() => handleJoinGame(value)}>Send</button>
            </div>
        </div>
    );
}
