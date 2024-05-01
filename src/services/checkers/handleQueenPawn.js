export const placeHoldersQueen = (
    newSquares,
    i,
    player,
    obligation,
    isClicked,
    isOpponent
) => {
    const pieceTemp = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    let piece = player === 1 ? "/w-pawn.svg" : "/b-pawn.svg";
    const directions = [
        { x: -1, y: -1, ennemyPiece: false }, // Haut gauche
        { x: 1, y: -1, ennemyPiece: false }, // Haut droit
        { x: -1, y: 1, ennemyPiece: false }, // Bas gauche
        { x: 1, y: 1, ennemyPiece: false }, // Bas droit
    ];
    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    const color = !obligation ? "bg-[#86421d]" : "bg-blue-400";

    if (isClicked) {
        newSquares[i].selected = true;
        piece = player === 1 ? "/b-pawn.svg" : "/w-pawn.svg";
    }

    // First check for enemies with an empty space behind them
    const checkEnnemyPiece = checkEnemyWithQueen(
        newSquares,
        i,
        player,
        isOpponent
    );
    console.log(checkEnnemyPiece);

    if (checkEnnemyPiece.length > 0) {
        // Movement logic based on initial check
        directions.forEach((direction) => {
            let step = 1;
            let isJumping = false; // Indicates if the queen is in the process of jumping over an opponent

            while (true) {
                const nextX = x + step * direction.x;
                const nextY = y + step * direction.y;
                const nextIndex = nextY * boardSize + nextX;

                // Check if the next position is out of bounds
                if (
                    nextX < 0 ||
                    nextX >= boardSize ||
                    nextY < 0 ||
                    nextY >= boardSize
                ) {
                    break;
                }

                const jumpX = nextX + direction.x;
                const jumpY = nextY + direction.y;
                const jumpIndex = jumpY * boardSize + jumpX;

                if (newSquares[nextIndex].img !== null && !isJumping) {
                    console.log(newSquares[nextIndex], piece);
                    if (newSquares[nextIndex].img.includes(piece)) {
                        // Check if the space after the enemy is empty and valid for a jump
                        if (
                            jumpX >= 0 &&
                            jumpX < boardSize &&
                            jumpY >= 0 &&
                            jumpY < boardSize &&
                            newSquares[jumpIndex].img === null
                        ) {
                            if (isClicked)
                                newSquares[jumpIndex].img = pieceTemp; // Mark this as a valid move
                            newSquares[jumpIndex].color = color;
                            isJumping = true; // The queen is now jumping
                            step++; // Move to the next step in this direction
                            continue;
                        }
                    }
                    break; // Stop if an enemy is encountered and no jump is possible
                }

                if (isJumping) {
                    // Continue marking accessible squares after the jump
                    if (isClicked) {
                        newSquares[nextIndex].img = pieceTemp;
                    }
                    newSquares[nextIndex].color = color;

                    if (
                        newSquares[jumpIndex] &&
                        newSquares[jumpIndex].img !== null
                    ) {
                        break;
                    }
                }

                step++;
            }
        });

        return;
    }

    if (!obligation) {
        directions.forEach((direction) => {
            let x = i % boardSize;
            let y = Math.floor(i / boardSize);
            let step = 1;

            while (true) {
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
                newSquares[nextIndex].img = "/wp-pawn.svg";

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

export const checkEnemyWithQueen = (newSquares, i, player, isOpponent) => {
    console.log(i);
    const directions = [
        { x: -1, y: -1, ennemyPiece: false, posistion: null }, // Haut gauche
        { x: 1, y: -1, ennemyPiece: false, posistion: null }, // Haut droit
        { x: -1, y: 1, ennemyPiece: false, posistion: null }, // Bas gauche
        { x: 1, y: 1, ennemyPiece: false, posistion: null }, // Bas droit
    ];
    const boardSize = Math.sqrt(newSquares.length); // Assuming a square board
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    let opponentPiece = player === 1 ? "/b-pawn.svg" : "/w-pawn.svg";

    if (isOpponent)
        opponentPiece = player === 1 ? "/w-pawn.svg" : "/b-pawn.svg";

    directions.forEach((direction) => {
        let step = 1;

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

            if (newSquares[nextIndex].img !== null) {
                if (newSquares[nextIndex].img.includes(opponentPiece)) {
                    const jumpX = nextX + direction.x;
                    const jumpY = nextY + direction.y;
                    const jumpIndex = jumpY * boardSize + jumpX;

                    if (
                        jumpX >= 0 &&
                        jumpX < boardSize &&
                        jumpY >= 0 &&
                        jumpY < boardSize &&
                        newSquares[jumpIndex].img === null
                    ) {
                        direction.ennemyPiece = true; // Mark direction as having an enemy piece with space to jump
                        direction.posistion = nextIndex;
                        break;
                    }
                }
                break;
            }
            step++;
        }
    });

    const checkEnnemyPiece = directions.filter(
        (direction) => direction.ennemyPiece
    );

    return checkEnnemyPiece;
};
