import { findLongestJumpChainQueen } from "./handleQueenPawn";
import { handlePawns } from "./pawn";

const directionsPawn = [
    { x: -1, y: -1 }, // Haut gauche
    { x: 1, y: -1 }, // Haut droit
    { x: -1, y: 1 }, // Bas gauche
    { x: 1, y: 1 }, // Bas droit
];

const findLongestJumpChain = (
    newSquares,
    pawn,
    opponentPiece,
    opponentQueenPiece,
    pastPlaces,
    chainLength,
    chains
) => {
    if (pastPlaces.find((el) => el === pawn)) return;

    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = pawn % boardSize;
    const y = Math.floor(pawn / boardSize);

    for (let i = 0; i < directionsPawn.length; i++) {
        const direction = directionsPawn[i];
        const nextX = x + direction.x * 2;
        const nextY = y + direction.y * 2;
        const nextIndex = nextY * boardSize + nextX;

        if (
            nextX >= 0 &&
            nextX < boardSize && // Assurer que nextX est dans les limites du plateau
            nextY >= 0 &&
            nextY < boardSize // Assurer que nextY est dans les limites du plateau
        ) {
            if (newSquares[nextIndex].img === null) {
                const previousNextX = x + direction.x;
                const previousNextY = y + direction.y;
                const previousNextIndex =
                    previousNextY * boardSize + previousNextX;

                if (
                    newSquares[previousNextIndex].img &&
                    (newSquares[previousNextIndex].img.includes(
                        opponentPiece
                    ) ||
                        newSquares[previousNextIndex].img.includes(
                            opponentQueenPiece
                        ))
                ) {
                    if (!pastPlaces.find((el) => el === nextIndex)) {
                        const newChain = [...chainLength, nextIndex];
                        chains.push(newChain);

                        pastPlaces.push(pawn);

                        findLongestJumpChain(
                            newSquares,
                            nextIndex,
                            opponentPiece,
                            opponentQueenPiece,
                            pastPlaces,
                            newChain,
                            chains
                        );
                    }
                }
            }
        }
    }
};

export const checkEnemyWithPawn = (
    newSquares,
    pawn,
    player,
    isOpponent,
    isQueen
) => {
    let opponentPiece = player === 1 ? "/b-pawn.png" : "/w-pawn.png";
    let opponentQueenPiece = player === 1 ? "/bQ-pawn.png" : "/wQ-pawn.png";

    if (isOpponent) {
        opponentPiece = player === 1 ? "/w-pawn.png" : "/b-pawn.png";
        opponentQueenPiece = player === 1 ? "/wQ-pawn.png" : "/bQ-pawn.png";
    }

    const pastPlaces = [];
    const chains = [];
    if (isQueen) {
        findLongestJumpChainQueen(
            newSquares,
            pawn,
            opponentPiece,
            opponentQueenPiece,
            pastPlaces,
            [],
            chains,
            null
        );
    } else {
        findLongestJumpChain(
            newSquares,
            pawn,
            opponentPiece,
            opponentQueenPiece,
            pastPlaces,
            [],
            chains
        );
    }

    const longestChainLength = chains.reduce(
        (maxLength, chain) => Math.max(maxLength, chain.length),
        0
    );

    const longestChains = chains.filter(
        (chain) => chain.length === longestChainLength
    );

    return longestChains;
};

export const placeHoldersPawn = (
    newSquares,
    i,
    player,
    obligation,
    isClicked,
    isOpponent
) => {
    const pieceTemp = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const color = !obligation ? "bg-[#86421d]" : "bg-blue-400";

    if (isClicked) {
        newSquares[i].selected = true;
    }

    // First check for enemies with an empty space behind them
    const checkEnnemyPiece = checkEnemyWithPawn(
        newSquares,
        i,
        player,
        isOpponent
    );

    if (checkEnnemyPiece.length > 0) {
        checkEnnemyPiece.forEach((chain) => {
            newSquares[chain[0]].color = color;

            if (isClicked) newSquares[chain[0]].img = pieceTemp;
        });
    }

    if (!obligation) {
        handlePawns(newSquares, i, obligation, pieceTemp, player);
    }
};
