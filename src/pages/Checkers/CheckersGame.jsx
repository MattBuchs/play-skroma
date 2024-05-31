import { useEffect, useState } from "react";
import Board from "../../components/Checkers/Board.jsx";
import { MovePawn } from "../../services/checkers/pawn.js";
import { placeHoldersPawn } from "../../services/checkers/handlePawns.js";
import { placeHoldersQueen } from "../../services/checkers/handleQueenPawn.js";
import {
    initializeSquares,
    clearTemporaryMoves,
    checkWinner,
} from "../../services/checkers/utils.js";
import { useSelector } from "react-redux";
import { initializeSocket } from "../../services/socket.js";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
const socket = initializeSocket("checkers");

function CheckersGame({ setDisplay }) {
    const params = useParams();
    const [pawnChoose, setPawnChoose] = useState(null);
    const [resultObligation, setResultObligation] = useState(false);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(false);
    const [squares, setSquares] = useState(initializeSquares);
    const { gameID } = useSelector((state) => state.checkersGame);
    const userId = localStorage.getItem("userId") || nanoid();

    useEffect(() => {
        localStorage.setItem("userId", userId);
    }, [userId]);

    useEffect(() => {
        setDisplay(false);
    }, [setDisplay]);

    useEffect(() => {
        document.title = "PlaySkroma | Checkers";
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        const gameId = gameID || params.gameID;
        socket.emit("joinGame", { gameId, userId }, (response) => {
            console.log(gameId, userId);
            if (response.success) {
                setSquares(response.squares);
            } else {
                alert(response.message);
            }
        });

        socket.on("move", (data) => {
            console.log("WOW");
            setSquares(data.squares);
        });

        return () => {
            socket.disconnect();
        };
    }, [gameID, userId]);

    const handleClick = (i) => {
        const newSquares = squares.slice();

        if (newSquares[i].img && !winner) {
            const isPlayerOne = player === 1;
            const pawnType = isPlayerOne ? "/w-pawn.png" : "/b-pawn.png";
            const tempPawnType = isPlayerOne ? "/wp-pawn.svg" : "/bp-pawn.svg";
            const pawnQueenType = isPlayerOne ? "/wQ-pawn.png" : "/bQ-pawn.png";
            const opponentPawnType = isPlayerOne
                ? "/b-pawn.png"
                : "/w-pawn.png";
            const pawnOpacity = isPlayerOne
                ? "/b-pawn-opacity.png"
                : "/w-pawn-opacity.png";

            if (newSquares[i].selected) {
                clearTemporaryMoves(newSquares, tempPawnType);
                return setSquares(newSquares);
            }

            if (
                newSquares[i].img === pawnType ||
                newSquares[i].img === pawnQueenType
            ) {
                setPawnChoose(newSquares[i].id);
                clearTemporaryMoves(newSquares, tempPawnType);

                if (newSquares[i].img === pawnQueenType) {
                    placeHoldersQueen(
                        newSquares,
                        i,
                        player,
                        resultObligation,
                        true,
                        false
                    );
                    return setSquares(newSquares);
                }

                placeHoldersPawn(
                    newSquares,
                    i,
                    player,
                    resultObligation,
                    true,
                    false
                );

                return setSquares(newSquares);
            }

            if (newSquares[i].img === tempPawnType) {
                const isReplay = MovePawn(
                    newSquares,
                    i,
                    pawnChoose,
                    player,
                    setResultObligation,
                    resultObligation,
                    newSquares[pawnChoose].img === pawnQueenType
                );

                if (!isReplay) {
                    newSquares.map((square) => {
                        if (square.img === pawnOpacity) square.img = null;
                    });

                    checkWinner(
                        newSquares,
                        player.toString(),
                        opponentPawnType,
                        setWinner,
                        setPlayer
                    );

                    let gameId = gameID;
                    if (!gameID) gameId = params.gameID;

                    socket.emit("move", {
                        gameId,
                        squares: newSquares,
                    });
                }
            }
        }

        setSquares(newSquares);
    };

    return (
        <div className="flex justify-center items-center py-4">
            <Board squares={squares} onClick={handleClick} player={player} />
        </div>
    );
}

export default CheckersGame;
