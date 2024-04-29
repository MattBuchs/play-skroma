import { useState } from "react";
import Board from "./components/Board.jsx";
import { initializeSquares } from "./utils/initialization.js";
import {
    clearTemporaryMoves,
    shifting,
    shiftingTemp,
    moveQueen,
} from "./utils/game.js";
import { checkWinner } from "./utils/winner.js";

function App() {
    const [pawnChoose, setPawnChoose] = useState(null);
    const [resultObligation, setResultObligation] = useState(false);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(false);
    const [squares, setSquares] = useState(initializeSquares);

    const handleClick = (i) => {
        const newSquares = squares.slice();

        if (newSquares[i].img && !winner) {
            const isPlayerOne = player === 1;
            const pawnType = isPlayerOne ? "/w-pawn.svg" : "/b-pawn.svg";
            const tempPawnType = isPlayerOne ? "/wp-pawn.svg" : "/bp-pawn.svg";
            const pawnQueenType = isPlayerOne ? "/wQ-pawn.svg" : "/bQ-pawn.svg";
            const direction = isPlayerOne ? "backward" : "forward";
            const opponentPawnType = isPlayerOne
                ? "/b-pawn.svg"
                : "/w-pawn.svg";

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
                    newSquares[i].isQueen = true;
                }

                if (newSquares[i].isQueen) {
                    return moveQueen(newSquares, i, player);
                }

                shifting(
                    newSquares,
                    i,
                    resultObligation,
                    tempPawnType,
                    direction,
                    newSquares[i].isQueen
                );
            }

            if (newSquares[i].img === tempPawnType) {
                const isReplay = shiftingTemp(
                    newSquares,
                    i,
                    pawnChoose,
                    player,
                    setResultObligation,
                    resultObligation,
                    newSquares[pawnChoose].isQueen
                );

                if (!isReplay) {
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
        <div className="flex justify-center items-center min-h-screen bg-gray-500">
            <Board squares={squares} onClick={handleClick} />
        </div>
    );
}

export default App;
