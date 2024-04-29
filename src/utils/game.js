export const shifting = (
    newSquares,
    i,
    resultObligation,
    img,
    direction,
    isQueen
) => {
    const shift1 = !resultObligation ? 9 : 18;
    const shift2 = !resultObligation ? 11 : 22;
    const shiftIndex1 = direction === "forward" ? i + shift1 : i - shift1;
    const shiftIndex2 = direction === "forward" ? i + shift2 : i - shift2;
    const shiftIndex3 = direction !== "forward" ? i + shift1 : i - shift1;
    const shiftIndex4 = direction !== "forward" ? i + shift2 : i - shift2;
    const color = !resultObligation ? "bg-[#86421d]" : "bg-blue-400";

    if (!isQueen) {
        if (
            newSquares[shiftIndex1] &&
            newSquares[shiftIndex1].img === null &&
            newSquares[shiftIndex1].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex1].img = img;
        }
        if (
            newSquares[shiftIndex2] &&
            newSquares[shiftIndex2].img === null &&
            newSquares[shiftIndex2].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex2].img = img;
        }

        if (resultObligation) {
            if (
                newSquares[shiftIndex3] &&
                newSquares[shiftIndex3].img === null &&
                newSquares[shiftIndex3].color === color
            ) {
                newSquares[i].selected = true;
                newSquares[shiftIndex3].img = img;
            }
            if (
                newSquares[shiftIndex4] &&
                newSquares[shiftIndex4].img === null &&
                newSquares[shiftIndex4].color === color
            ) {
                newSquares[i].selected = true;
                newSquares[shiftIndex4].img = img;
            }
        }

        return;
    }
};

export const shiftingTemp = (
    newSquares,
    i,
    pawnChoose,
    player,
    setResultObligation,
    resultObligation,
    isQueen
) => {
    let piece = player === 1 ? "/w-pawn.svg" : "/b-pawn.svg";
    piece = isQueen ? piece.slice(0, 2) + "Q" + piece.slice(2) : piece;
    const opponentPiece = player === 1 ? "/b-pawn.svg" : "/w-pawn.svg";
    const tempPiece = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const colorBlue = "bg-blue-400";
    const colorBlueHighlight = "bg-blue-600";
    const colorStandard = "bg-[#86421d]";
    const shift1 = 18;
    const shift2 = 22;

    newSquares[i].img = piece;

    if (newSquares[i].color === colorBlue) {
        newSquares[i].color = colorStandard;

        const pawn =
            player === 1
                ? (newSquares[pawnChoose].id - newSquares[i].id) / 2
                : (newSquares[i].id - newSquares[pawnChoose].id) / 2;

        const calc = player === 1 ? pawnChoose - pawn : pawnChoose + pawn;

        newSquares[calc].img = null;
        setResultObligation(false);
    }

    newSquares.map((el) => {
        if (el.img === tempPiece) el.img = null;
        if (el.id === pawnChoose) el.img = null;
        if (el.color === colorBlueHighlight) el.color = colorStandard;
        if (el.color === colorBlue) el.color = colorStandard;
    });

    if (resultObligation) {
        const isReplay = checkReplay(newSquares, i, setResultObligation);
        if (isReplay) return isReplay;
    }

    if (
        newSquares[i].img === "/w-pawn.svg" &&
        newSquares[i].id < 10 &&
        newSquares[i].id > 0
    ) {
        newSquares[i].img = "/wQ-pawn.svg";
    }

    if (
        newSquares[i].img === "/b-pawn.svg" &&
        newSquares[i].id < 100 &&
        newSquares[i].id > 89
    ) {
        newSquares[i].img = "/bQ-pawn.svg";
    }

    newSquares.map((el) => {
        if (
            el.img === opponentPiece &&
            newSquares[el.id + shift2] &&
            newSquares[el.id + shift2].color === colorStandard &&
            newSquares[el.id + shift2].img === null &&
            newSquares[el.id + shift2 / 2].img === piece
        ) {
            el.color = colorBlueHighlight;
            newSquares[el.id + shift2].color = colorBlue;
            setResultObligation(true);
        }
        if (
            el.img === opponentPiece &&
            newSquares[el.id + shift1] &&
            newSquares[el.id + shift1].color === colorStandard &&
            newSquares[el.id + shift1].img === null &&
            newSquares[el.id + shift1 / 2].img === piece
        ) {
            el.color = colorBlueHighlight;
            newSquares[el.id + shift1].color = colorBlue;
            setResultObligation(true);
        }
        if (
            el.img === opponentPiece &&
            newSquares[el.id - shift2] &&
            newSquares[el.id - shift2].color === colorStandard &&
            newSquares[el.id - shift2].img === null &&
            newSquares[el.id - shift2 / 2].img === piece
        ) {
            el.color = colorBlueHighlight;
            newSquares[el.id - shift2].color = colorBlue;
            setResultObligation(true);
        }
        if (
            el.img === opponentPiece &&
            newSquares[el.id - shift1] &&
            newSquares[el.id - shift1].color === colorStandard &&
            newSquares[el.id - shift1].img === null &&
            newSquares[el.id - shift1 / 2].img === piece
        ) {
            el.color = colorBlueHighlight;
            newSquares[el.id - shift1].color = colorBlue;
            setResultObligation(true);
        }
    });

    return false;
};

export const clearTemporaryMoves = (squares, piece) => {
    squares.forEach((square) => {
        if (square.img === piece) square.img = null;
        if (square.selected === true) square.selected = false;
    });
};

export const checkReplay = (newSquares, i, setResultObligation) => {
    // Helper function to check potential replay moves
    const checkMove = (index, offset, enemyPiece) => {
        let moveReplay = false;
        let moveNumber = null;
        const targetIndex = index + offset;
        const midIndex = index + offset / 2;

        if (
            newSquares[targetIndex] &&
            newSquares[midIndex].img === enemyPiece &&
            newSquares[targetIndex].img === null &&
            newSquares[targetIndex].color === "bg-[#86421d]"
        ) {
            newSquares[index].color = "bg-blue-600";
            newSquares[targetIndex].color = "bg-blue-400";
            setResultObligation(true);
            moveReplay = true;
            moveNumber = Math.abs(offset);
        }

        return { moveReplay, moveNumber };
    };

    let isReplay = false;
    const pawn = newSquares[i].img;
    const enemyPiece = pawn === "/w-pawn.svg" ? "/b-pawn.svg" : "/w-pawn.svg";
    const offsets = [-18, -22, 18, 22];

    for (let offset of offsets) {
        const result = checkMove(i, offset, enemyPiece);
        if (result.moveReplay) {
            isReplay = true;
            break; // Stop checking if a valid move is found
        }
    }

    return isReplay;
};

export const moveQueen = (newSquares, i, player) => {
    newSquares[i].selected = true;
    const piece = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const opponentPiece = player === 1 ? "/b-pawn.svg" : "/w-pawn.svg";
    const directions = [
        { x: -1, y: -1 }, // Haut gauche
        { x: 1, y: -1 }, // Haut droit
        { x: -1, y: 1 }, // Bas gauche
        { x: 1, y: 1 }, // Bas droit
    ];
    const boardSize = Math.sqrt(newSquares.length); // Assumant un plateau carré

    directions.forEach((direction) => {
        let x = i % boardSize;
        let y = Math.floor(i / boardSize);
        let step = 1;

        while (true) {
            const nextX = x + step * direction.x;
            const nextY = y + step * direction.y;
            const nextIndex = nextY * boardSize + nextX;

            // Vérifie si la position suivante est hors des limites du plateau
            if (
                nextX < 0 ||
                nextX >= boardSize ||
                nextY < 0 ||
                nextY >= boardSize
            ) {
                break;
            }

            // Détecter un obstacle: autre pièce sur le plateau
            if (newSquares[nextIndex].img !== null) {
                // Si c'est un pion ennemi et la case derrière lui est vide, marquer cette case
                const captureX = nextX + direction.x;
                const captureY = nextY + direction.y;
                const captureIndex = captureY * boardSize + captureX;
                if (
                    captureX >= 0 &&
                    captureX < boardSize &&
                    captureY >= 0 &&
                    captureY < boardSize &&
                    newSquares[nextIndex].img.includes(opponentPiece) &&
                    newSquares[captureIndex].img === null
                ) {
                    newSquares[captureIndex].img = piece; // Marquer la possibilité de capture
                }
                break; // Arrêter après le pion ennemi, que la capture soit possible ou non
            }

            // Marque la case comme accessible
            newSquares[nextIndex].img = piece;
            step++;
        }
    });
};
