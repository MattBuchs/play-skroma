import { useEffect, useState } from "react";
import { getSocket } from "../../services/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOnlineMode } from "../../features/checkers/checkersGame";
import { isTokenValid } from "../../utils/token";
import { checkToken } from "../../features/user";

export default function MorpionGame() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [socketId, setSocketId] = useState(null);
    const [table, setTable] = useState([]);
    const [showStartButton, setShowStartButton] = useState(true);
    const [showReplayButton, setShowReplayButton] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [playerTurn, setPlayerTurn] = useState(null);
    const [opposingPlayer, setOpposingPlayer] = useState(null);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [winner, setWinner] = useState(null);
    const [playerDisconnected, setPlayerDisconnected] = useState(false);

    useEffect(() => {
        if (params.gameID) {
            const token = localStorage.getItem("user");
            if (isTokenValid(token)) dispatch(setOnlineMode(true));
            else {
                dispatch(checkToken());
                navigate("/login");
            }
        }
    }, [params.gameID, dispatch, navigate]);

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return navigate("/morpion-home");

        setSocketId(socket.id);
        // Événements socket
        socket.on("playerReady", () => {
            setPlayerReady(true);
        });

        socket.on(
            "startGame",
            (tableReceived, currentTurn, players, scores) => {
                setPlayerDisconnected(false);
                setShowStartButton(false);
                setPlayerReady(false);
                setTable(tableReceived);
                setPlayerTurn(currentTurn);
                setScore(scores);
                setOpposingPlayer(
                    players.find((user) => user.id !== socket.id).name
                );
            }
        );

        socket.on("updateGame", (newTable, currentTurn) => {
            setTable(newTable);
            setPlayerTurn(currentTurn);
        });

        socket.on("gameOver", (newTable, newWinner, newScore) => {
            setTable(newTable);
            setWinner(newWinner);
            setScore(newScore);
            setShowReplayButton(true);
        });

        socket.on("resetGame", (playerTurn) => {
            setPlayerTurn(playerTurn);
            setWinner(null);
            setShowReplayButton(false);
        });

        socket.on("playerDisconnected", () => {
            setTable([]);
            setShowStartButton(false);
            setShowReplayButton(false);
            setWinner(null);
            setPlayerDisconnected(true);
        });

        return () => {
            dispatch(setOnlineMode(false));
            socket.disconnect();
        };
    }, [navigate, dispatch]);

    const handleMove = (row, col) => {
        const socket = getSocket();
        if (!socket) return;

        if (playerTurn === socket.id && table[row][col].value === 0) {
            socket.emit("makeMove", params.gameID, { row, col });
        }
    };

    const handleReady = (isReplay) => {
        const socket = getSocket();
        if (socket) socket.emit("ready", params.gameID, isReplay);
    };

    return (
        <div className="h-full">
            <h2 className="text-center text-4xl font-bold mt-6 underline">
                Tic-Tac-Toe
            </h2>
            <p className="text-center text-3xl mt-4">
                <span className="text-red-700 font-bold">{score.player1}</span>{" "}
                /{" "}
                <span className="text-blue-700 font-bold">{score.player2}</span>
            </p>

            <div className="flex flex-col justify-center items-center my-8 sm:my-20">
                {!winner && !showStartButton && !playerDisconnected && (
                    <div className="text-xl mb-1">
                        {playerTurn === socketId
                            ? "Your turn"
                            : `Waiting for ${opposingPlayer}'s turn`}
                    </div>
                )}
                {!winner && !showStartButton && playerDisconnected && (
                    <div className="text-xl mb-1 text-center">
                        <p>Opposing player disconnected !</p>
                        <small>
                            Resend the code to the opposing player :{" "}
                            <span className="font-bold">{params.gameID}</span>
                        </small>
                    </div>
                )}
                {!winner && showStartButton && (
                    <div className="text-xl mb-1 text-center">
                        <p>Waiting for all players to be ready.</p>
                        <small>
                            Send the code to the opposing player :{" "}
                            <span className="font-bold">{params.gameID}</span>
                        </small>
                    </div>
                )}
                {winner && typeof winner === "string" && (
                    <p className="mb-1 text-xl">Equality !</p>
                )}
                {winner && typeof winner === "object" && (
                    <p className="mb-1 text-xl">
                        Player{" "}
                        <span
                            className={`font-bold ${
                                winner.symbol === "X"
                                    ? "text-red-700"
                                    : "text-blue-700"
                            }`}
                        >
                            {winner.name}
                        </span>{" "}
                        wins !
                    </p>
                )}

                {table && table.length > 0 && (
                    <table className="morpion border-2 border-gray-600 w-[300px] h-[300px] mb-4 select-none">
                        <tbody>
                            {table.map((row, indexRow) => (
                                <tr key={indexRow}>
                                    {row.map((cell, indexCol) => (
                                        <td
                                            key={`${indexRow}-${indexCol}`}
                                            onClick={() =>
                                                handleMove(indexRow, indexCol)
                                            }
                                            className={`w-1/3 h-1/3 border border-gray-800 text-center text-6xl cursor-pointer ${
                                                cell.value === 1
                                                    ? "text-red-700"
                                                    : "text-blue-700"
                                            }`}
                                        >
                                            {cell.value === 1
                                                ? "X"
                                                : cell.value === -1
                                                ? "O"
                                                : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {table && table.length === 0 && (
                    <img src="/img/morpion/loading.gif" alt="Loading" />
                )}

                {showStartButton && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                        onClick={() => handleReady(false)}
                    >
                        Ready {playerReady ? "✔" : "?"}
                    </button>
                )}
                {showReplayButton && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                        onClick={() => handleReady(true)}
                    >
                        Replay {playerReady ? "✔" : "?"}
                    </button>
                )}
            </div>
        </div>
    );
}
