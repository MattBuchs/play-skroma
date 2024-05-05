import { useEffect, useState } from "react";
import Board from "../components/Checkers/Board.jsx";
import { placeHoldersPawn, MovePawn } from "../services/checkers/handlePawn.js";
import { placeHoldersQueen } from "../services/checkers/handleQueenPawn.js";
import {
    initializeSquares,
    clearTemporaryMoves,
    checkWinner,
} from "../services/checkers/utils.js";

function Checkers({ setDisplay }) {
    const [pawnChoose, setPawnChoose] = useState(null);
    const [resultObligation, setResultObligation] = useState(false);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(false);
    const [squares, setSquares] = useState(initializeSquares);

    useEffect(() => {
        setDisplay(false);
    }, [setDisplay]);

    useEffect(() => {
        document.title = "PlaySkroma | Checkers";
    }, []);

    const handleClick = (i) => {
        const newSquares = squares.slice();

        if (newSquares[i].img && !winner) {
            const isPlayerOne = player === 1;
            const pawnType = isPlayerOne ? "/w-pawn.png" : "/b-pawn.png";
            const tempPawnType = isPlayerOne ? "/wp-pawn.svg" : "/bp-pawn.svg";
            const pawnQueenType = isPlayerOne ? "/wQ-pawn.png" : "/bQ-pawn.png";
            const pawnOpacity =
                player === 1 ? "/b-pawn-opacity.png" : "/w-pawn-opacity.png";
            const direction = isPlayerOne ? "backward" : "forward";
            const opponentPawnType = isPlayerOne
                ? "/b-pawn.png"
                : "/w-pawn.png";
            const opponentQueenType = isPlayerOne
                ? "/bQ-pawn.png"
                : "/wQ-pawn.png";

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
                    resultObligation,
                    tempPawnType,
                    direction,
                    opponentPawnType,
                    opponentQueenType
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

export default Checkers;
