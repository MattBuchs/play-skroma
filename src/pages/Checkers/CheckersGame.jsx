import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Board from "../../components/Checkers/Board.jsx";
import { MovePawn, ratings } from "../../services/checkers/pawn.js";
import { placeHoldersPawn } from "../../services/checkers/handlePawns.js";
import { placeHoldersQueen } from "../../services/checkers/handleQueenPawn.js";
import {
    initializeSquares,
    clearTemporaryMoves,
    checkWinner,
    displayWinner,
} from "../../services/checkers/utils.js";
import { hideNavbar } from "../../features/navbar.js";
// import { initializeSocket } from "../../services/socket.js";
import {
    addWinner,
    removeWinner,
} from "../../features/checkers/checkersGame.js";
// const socket = initializeSocket("checkers");

function CheckersGame() {
    const params = useParams();
    const dispatch = useDispatch();
    const [pawnChoose, setPawnChoose] = useState(null);
    const [resultObligation, setResultObligation] = useState(false);
    const [player, setPlayer] = useState(1);
    const [squares, setSquares] = useState(initializeSquares);
    const { gameID, onlineMode, isWinner } = useSelector(
        (state) => state.checkersGame
    );
    const userId = localStorage.getItem("userId") || nanoid();

    useEffect(() => {
        localStorage.setItem("userId", userId);
    }, [userId]);

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(removeWinner());
    }, [dispatch]);

    useEffect(() => {
        document.title = "PlaySkroma | Checkers";

        if (ratings.length > 0) ratings.splice(0, ratings.length);
    }, []);

    // useEffect(() => {
    //     if (onlineMode) {
    //         socket.on("connect", () => {
    //             console.log("Connected to server");
    //         });

    //         const gameId = gameID || params.gameID;
    //         socket.emit("joinGame", { gameId, userId }, (response) => {
    //             console.log(gameId, userId);
    //             if (response.success) {
    //                 setSquares(response.squares);
    //             } else {
    //                 alert(response.message);
    //             }
    //         });

    //         socket.on("move", (data) => {
    //             setSquares(data.squares);
    //         });

    //         return () => {
    //             socket.disconnect();
    //         };
    //     }
    // }, [gameID, userId, onlineMode, params.gameID]);

    const handleClick = (i) => {
        const newSquares = squares.slice();

        if (newSquares[i].img && !isWinner) {
            const isPlayerOne = player === 1;
            const pawnType = isPlayerOne ? "/w-pawn.png" : "/b-pawn.png";
            const tempPawnType = isPlayerOne ? "/wp-pawn.svg" : "/bp-pawn.svg";
            const pawnQueenType = isPlayerOne ? "/wQ-pawn.png" : "/bQ-pawn.png";
            const opponentPawnType = isPlayerOne
                ? "/b-pawn.png"
                : "/w-pawn.png";

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
                    const winner = checkWinner(
                        newSquares,
                        player.toString(),
                        opponentPawnType,
                        setPlayer
                    );

                    if (winner) {
                        dispatch(addWinner());
                        displayWinner(player.toString());
                    }

                    let gameId = gameID;
                    if (!gameID) gameId = params.gameID;

                    // socket.emit("move", {
                    //     gameId,
                    //     squares: newSquares,
                    // });
                }
            }
        }

        setSquares(newSquares);
    };

    return (
        <div className="flex justify-center items-center h-full px-2 py-10">
            <Board squares={squares} onClick={handleClick} player={player} />
        </div>
    );
}

export default CheckersGame;
