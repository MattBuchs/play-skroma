import { useNavigate } from "react-router-dom";
import { getSocket, initializeSocket } from "../../services/socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../../features/user";

export default function MorpionHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    const handleCreateGame = () => {
        if (!isAuthenticated) return navigate("/login");

        initializeSocket("morpion");
        const socket = getSocket();

        socket.emit("createGame", (gameId) => {
            navigate(`/morpion/${gameId}`);
        });
    };

    const handleJoinGame = () => {
        if (!isAuthenticated) return navigate("/login");

        initializeSocket("morpion");
        const gameId = prompt("Enter the game ID:");

        if (gameId) {
            const socket = getSocket();
            socket.emit("joinGame", gameId, ({ success, message }) => {
                if (success) {
                    navigate(`/morpion/${gameId}`);
                } else {
                    alert(message || "Failed to join the game.");
                }
            });
        }
    };

    return (
        <section className="flex flex-col h-full">
            <h2 className="text-center text-4xl font-bold mt-8 underline">
                Tic-Tac-Toe
            </h2>
            <div className="flex flex-col justify-center items-center h-full px-4 mb-20">
                <button
                    onClick={() => navigate("/morpion")}
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
                    onClick={handleJoinGame}
                    className="bg-blue-700 text-white w-full xxs:w-[350px] py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
                >
                    Join game
                </button>
            </div>
        </section>
    );
}
