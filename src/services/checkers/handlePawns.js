/* eslint-disable no-constant-condition */
import { handlePawns } from "./pawn";

let directionsPawn = [
    { x: -1, y: -1, ennemyPiece: 0, position: null }, // Haut gauche
    { x: 1, y: -1, ennemyPiece: 0, position: null }, // Haut droit
    { x: -1, y: 1, ennemyPiece: 0, position: null }, // Bas gauche
    { x: 1, y: 1, ennemyPiece: 0, position: null }, // Bas droit
];

export const checkEnemyWithPawn = (newSquares, i, player, isOpponent) => {
    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    let opponentPiece = player === 1 ? "/b-pawn.png" : "/w-pawn.png";
    let opponentQueenPiece = player === 1 ? "/bQ-pawn.png" : "/wQ-pawn.png";

    if (isOpponent) {
        opponentPiece = player === 1 ? "/w-pawn.png" : "/b-pawn.png";
        opponentQueenPiece = player === 1 ? "/wQ-pawn.png" : "/bQ-pawn.png";
    }

    directionsPawn = [
        { x: -1, y: -1, ennemyPiece: 0, position: null }, // Haut gauche
        { x: 1, y: -1, ennemyPiece: 0, position: null }, // Haut droit
        { x: -1, y: 1, ennemyPiece: 0, position: null }, // Bas gauche
        { x: 1, y: 1, ennemyPiece: 0, position: null }, // Bas droit
    ];

    directionsPawn.forEach((direction) => {
        let step = 1;
        let canJump = false;

        while (true) {
            const nextX = x + step * direction.x;
            const nextY = y + step * direction.y;
            const nextIndex = nextY * boardSize + nextX;

            if (
                nextX < 0 ||
                nextX >= boardSize ||
                nextY < 0 ||
                nextY >= boardSize
            ) {
                break;
            }

            if (newSquares[nextIndex].img === null) {
                if (canJump) {
                    direction.ennemyPiece += 1; // Increment the count of enemy pieces in this direction
                    direction.position = nextIndex;
                    canJump = false;
                }
            } else if (
                newSquares[nextIndex].img.includes(opponentPiece) ||
                newSquares[nextIndex].img.includes(opponentQueenPiece)
            ) {
                if (step === 1) {
                    canJump = true;
                } else {
                    break;
                }
            } else {
                break;
            }

            step++;
        }
    });

    const maxEnnemyPiece = Math.max(
        ...directionsPawn.map((direction) => direction.ennemyPiece)
    );
    const maxEnnemyDirections = directionsPawn.filter(
        (direction) => direction.ennemyPiece === maxEnnemyPiece
    );

    if (maxEnnemyDirections.find((direction) => direction.ennemyPiece === 0))
        return [];

    return maxEnnemyDirections;
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
    let piece = player === 1 ? "/w-pawn.png" : "/b-pawn.png";
    let queenPiece = player === 1 ? "/wQ-pawn.png" : "/bQ-pawn.png";
    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    const color = !obligation ? "bg-[#86421d]" : "bg-blue-400";

    if (isClicked) {
        newSquares[i].selected = true;
        piece = player === 1 ? "/b-pawn.png" : "/w-pawn.png";
        queenPiece = player === 1 ? "/bQ-pawn.png" : "/wQ-pawn.png";
    }

    // First check for enemies with an empty space behind them
    const checkEnnemyPiece = checkEnemyWithPawn(
        newSquares,
        i,
        player,
        isOpponent
    );

    console.log("1", checkEnnemyPiece);

    if (checkEnnemyPiece.length > 0) {
        directionsPawn.forEach((direction) => {
            let step = 1;
            let canJump = false;

            while (true) {
                const nextX = x + step * direction.x;
                const nextY = y + step * direction.y;
                const nextIndex = nextY * boardSize + nextX;

                if (
                    nextX < 0 ||
                    nextX >= boardSize ||
                    nextY < 0 ||
                    nextY >= boardSize
                ) {
                    break;
                }

                if (newSquares[nextIndex].img === null) {
                    if (canJump) {
                        canJump = false;
                        if (
                            direction.ennemyPiece ===
                            checkEnnemyPiece[0].ennemyPiece
                        ) {
                            newSquares[nextIndex].color = color;
                            if (isClicked)
                                newSquares[nextIndex].img = pieceTemp;

                            break;
                        }
                    }
                } else if (
                    newSquares[nextIndex].img.includes(piece) ||
                    newSquares[nextIndex].img.includes(queenPiece)
                ) {
                    canJump = true;
                } else {
                    break;
                }

                step++;
            }
        });
    }

    if (!obligation) {
        handlePawns(newSquares, i, obligation, pieceTemp, player);
    }
};
