import { checkEnemyWithPawn } from "./handlePawns";

export let checkEnnemyPiece = [];

const directionsQueen = [
    { x: -1, y: -1 }, // Haut gauche
    { x: 1, y: -1 }, // Haut droit
    { x: -1, y: 1 }, // Bas gauche
    { x: 1, y: 1 }, // Bas droit
];

export const findLongestJumpChainQueen = (
    newSquares,
    queen,
    opponentPiece,
    opponentQueenPiece,
    pastPlaces,
    chainLength,
    chains,
    previousDirection
) => {
    if (pastPlaces.find((el) => el === queen)) return;

    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = queen % boardSize;
    const y = Math.floor(queen / boardSize);

    for (let i = 0; i < directionsQueen.length; i++) {
        const direction = directionsQueen[i];

        if (
            previousDirection &&
            previousDirection.x === direction.x &&
            previousDirection.y === direction.y
        ) {
            continue;
        }

        let step = 1;
        let canJump = false;
        let loop = true;

        while (loop) {
            const nextX = x + direction.x * step;
            const nextY = y + direction.y * step;
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
                    if (!pastPlaces.find((el) => el === nextIndex)) {
                        // const previousX = x + direction.x * (step - 1);
                        // const previousY = y + direction.y * (step - 1);
                        // const previousIndex = previousY * boardSize + previousX;
                        const othersIndex = [];
                        let step2 = step++;

                        while (loop) {
                            const otherNextX = x + direction.x * step2;
                            const otherNextY = y + direction.y * step2;
                            const otherNextIndex =
                                otherNextY * boardSize + otherNextX;

                            if (
                                otherNextX < 0 ||
                                otherNextX >= boardSize ||
                                otherNextY < 0 ||
                                otherNextY >= boardSize
                            ) {
                                break;
                            }

                            if (newSquares[otherNextIndex].img === null) {
                                othersIndex.push(otherNextIndex);
                                step2++;
                            } else {
                                break;
                            }
                        }

                        const newChain = [...chainLength, othersIndex];

                        chains.push(newChain);
                        pastPlaces.push(queen);

                        const oppositeDirection = {
                            x: direction.x * -1,
                            y: direction.y * -1,
                        };

                        findLongestJumpChainQueen(
                            newSquares,
                            nextIndex,
                            opponentPiece,
                            opponentQueenPiece,
                            pastPlaces,
                            newChain,
                            chains,
                            oppositeDirection
                        );
                    }
                }
                canJump = false;
            } else if (
                canJump === false &&
                (newSquares[nextIndex].img.includes(opponentPiece) ||
                    newSquares[nextIndex].img.includes(opponentQueenPiece))
            ) {
                canJump = true;
            } else {
                break;
            }

            step++;
        }
    }
};

export const placeHoldersQueen = (
    newSquares,
    i,
    player,
    obligation,
    isClicked,
    isOpponent
) => {
    const pieceTemp = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    const color = !obligation ? "bg-[#86421d]" : "bg-blue-400";

    if (isClicked) {
        newSquares[i].selected = true;
    }

    // First check for enemies with an empty space behind them
    checkEnnemyPiece = checkEnemyWithPawn(
        newSquares,
        i,
        player,
        isOpponent,
        true
    );

    if (checkEnnemyPiece.length > 0) {
        checkEnnemyPiece.forEach((chain) => {
            if (checkEnnemyPiece[0].length === 1) {
                chain[0].forEach((box) => {
                    newSquares[box].color = color;
                });
            } else {
                newSquares[chain[0][0]].color = color;
            }

            if (isClicked) {
                if (checkEnnemyPiece[0].length === 1) {
                    chain[0].forEach((box) => {
                        newSquares[box].img = pieceTemp;
                    });
                } else {
                    newSquares[chain[0][0]].img = pieceTemp;
                }
            }
        });
    }

    if (!obligation) {
        directionsQueen.forEach((direction) => {
            let step = 1;
            let loop = true;

            while (loop) {
                const nextX = x + step * direction.x;
                const nextY = y + step * direction.y;
                const nextIndex = nextY * boardSize + nextX;

                // Vérifie si la position suivante est hors des limites du plateau ou rencontre une pièce
                if (
                    nextX < 0 ||
                    nextX >= boardSize ||
                    nextY < 0 ||
                    nextY >= boardSize ||
                    newSquares[nextIndex].img !== null
                ) {
                    break;
                }

                // Marque la case comme accessible
                newSquares[nextIndex].img = pieceTemp;

                // Vérifie si la position après la suivante est un obstacle
                const furtherX = nextX + direction.x;
                const furtherY = nextY + direction.y;
                const furtherIndex = furtherY * boardSize + furtherX;
                if (
                    furtherX < 0 ||
                    furtherX >= boardSize ||
                    furtherY < 0 ||
                    furtherY >= boardSize ||
                    newSquares[furtherIndex].img !== null
                ) {
                    break;
                }

                step++;
            }
        });
    }
};
