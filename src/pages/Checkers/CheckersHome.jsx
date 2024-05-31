import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { getSocket } from "../../services/socket";
import CreateGameModal from "../../components/Checkers/Modal/CreateGameModal";
import JoinGameModal from "../../components/Checkers/Modal/JoinGameModal";
import { setGameID } from "../../features/checkersGame";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const userId = localStorage.getItem("userId") || nanoid();
localStorage.setItem("userId", userId);
const socket = getSocket();

export default function CheckersHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [showJoinGameModal, setShowJoinGameModal] = useState(false);

    const handleCreateGame = () => {
        setShowCreateGameModal(true);

        socket.emit("createGame", { userId }, (gameId) => {
            dispatch(setGameID(gameId));
            navigate(`/checkers/${gameId}`);
        });
    };

    return (
        <section className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%]">
            <Link
                to="/checkers"
                className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow hover:bg-blue-800"
            >
                Local game
            </Link>
            <button
                onClick={handleCreateGame}
                className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
            >
                Create game
            </button>
            <button
                onClick={() => setShowJoinGameModal(true)}
                className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
            >
                Join game
            </button>
            {showCreateGameModal &&
                createPortal(
                    <CreateGameModal
                        closeModal={() => setShowCreateGameModal(false)}
                    />,
                    document.body
                )}
            {showJoinGameModal &&
                createPortal(
                    <JoinGameModal
                        closeModal={() => setShowJoinGameModal(false)}
                    />,
                    document.body
                )}
        </section>
    );
}
