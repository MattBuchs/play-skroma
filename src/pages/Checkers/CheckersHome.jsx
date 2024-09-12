import { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
// import { getSocket } from "../../services/socket";
import CreateGameModal from "../../components/Checkers/Modal/CreateGameModal";
import JoinGameModal from "../../components/Checkers/Modal/JoinGameModal";
import { setGameID, setOnlineMode } from "../../features/checkers/checkersGame";

// const userId = localStorage.getItem("userId") || nanoid();
// localStorage.setItem("userId", userId);
// const socket = getSocket();

export default function CheckersHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [showJoinGameModal, setShowJoinGameModal] = useState(false);

    const handleCreateGame = () => {
        setShowCreateGameModal(true);

        // socket.emit("createGame", { userId }, (gameId) => {
        //     dispatch(setGameID(gameId));
        //     navigate(`/checkers/${gameId}`);
        // });
    };

    const handleLocalMode = () => {
        dispatch(setOnlineMode(false));
        navigate("/checkers");
    };

    return (
        <section className="flex flex-col h-full">
            <h2 className="text-center text-4xl font-bold mt-8 underline">
                Checkers
            </h2>
            <div className="flex flex-col justify-center items-center h-full px-4 mb-20">
                <button
                    onClick={handleLocalMode}
                    className="bg-blue-700 text-white w-full xxs:w-[350px] py-5 text-2xl rounded shadow hover:bg-blue-800"
                >
                    Local game
                </button>
                <button
                    onClick={handleCreateGame}
                    className="bg-blue-700 text-white w-full xxs:w-[350px] py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
                >
                    Create game
                </button>
                <button
                    onClick={() => setShowJoinGameModal(true)}
                    className="bg-blue-700 text-white w-full xxs:w-[350px] py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
                >
                    Join game
                </button>
            </div>
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
