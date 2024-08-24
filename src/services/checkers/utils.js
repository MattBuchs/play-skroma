export const initializeSquares = () => {
    let dialingId = 0;
    return Array(100)
        .fill(null)
        .map((_, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const isBlackSquare = (row + col) % 2 !== 0;
            const color = isBlackSquare ? "bg-[#86421d]" : "bg-[#d2a973]";

            if (isBlackSquare) {
                dialingId++;
                if (row < 4)
                    return {
                        id: index,
                        img: "/b-pawn.png",
                        color,
                        selected: false,
                        dialingId,
                    };
                else if (row > 5)
                    return {
                        id: index,
                        img: "/w-pawn.png",
                        color,
                        selected: false,
                        dialingId,
                    };
                else
                    return {
                        id: index,
                        img: null,
                        color,
                        selected: false,
                        dialingId,
                    };
            }
            return {
                id: index,
                img: null,
                color,
                selected: false,
                dialingId: null,
            };
        });
};

// export const initializeSquares = () => {
//     let dialingId = 0;
//     return Array(100)
//         .fill(null)
//         .map((_, index) => {
//             const row = Math.floor(index / 10);
//             const col = index % 10;
//             const isBlackSquare = (row + col) % 2 !== 0;
//             const color = isBlackSquare ? "bg-[#86421d]" : "bg-[#d2a973]";

//             if (isBlackSquare) {
//                 dialingId++;

//                 if (index === 5)
//                     return {
//                         id: index,
//                         img: "/bQ-pawn.png",
//                         color,
//                         selected: false,
//                         dialingId,
//                     };
//                 else if (
//                     index === 14 ||
//                     index === 16 ||
//                     index === 32 ||
//                     index === 34 ||
//                     index === 47 ||
//                     index === 54 ||
//                     index === 85 ||
//                     index === 90
//                 )
//                     return {
//                         id: index,
//                         img: "/w-pawn.png",
//                         color,
//                         selected: false,
//                         dialingId,
//                     };
//                 // } else if (index === 41) {
//                 //     if (index === 23 || index === 27)
//                 //         return {
//                 //             id: index,
//                 //             img: "/b-pawn.png",
//                 //             color,
//                 //             selected: false,
//                 //             dialingId,
//             }
//             // } else
//             //     return {
//             //         id: index,
//             //         img: null,
//             //         color,
//             //         selected: false,
//             //         dialingId,
//             //     };

//             return {
//                 id: index,
//                 img: null,
//                 color,
//                 selected: false,
//                 dialingId: null,
//             };
//         });
// };

export const clearTemporaryMoves = (squares, piece) => {
    squares.forEach((square) => {
        if (square.img === piece) square.img = null;
        if (square.selected === true) square.selected = false;
    });
};

export const checkWinner = (squares, player, img, setPlayer) => {
    let winner = false;
    let queen;

    if (img === "/w-pawn.png") queen = "/wQ-pawn.png";
    if (img === "/b-pawn.png") queen = "/bQ-pawn.png";

    const checkPawns = squares.find(
        (square) => square.img === img || square.img === queen
    );

    if (!checkPawns) {
        winner = true;
    }

    const whoNext = player === "1" ? 2 : 1;
    setPlayer(Number(whoNext));

    return winner;
};

export const displayWinner = (player) => {
    alert(`Le joueur ${player} à gagné`);
};

export const calculateWinningChances = (
    piecesWhite,
    queensWhite,
    piecesBlack,
    queensBlack
) => {
    const valuePawn = 1;
    const valueQueen = 2.15;

    const totalWhite = piecesWhite * valuePawn + queensWhite * valueQueen;
    const totalBlack = piecesBlack * valuePawn + queensBlack * valueQueen;

    const totalPieces = totalWhite + totalBlack;
    if (totalPieces === 0) return [0, 0]; // Éviter la division par zéro

    const whiteChance = (totalWhite / totalPieces) * 100;
    const blackChance = (totalBlack / totalPieces) * 100;

    return [whiteChance.toFixed(1), blackChance.toFixed(1)];
};

export const getDiagonalBetween = (startIndex, endIndex, boardSize) => {
    const startX = startIndex % boardSize;
    const startY = Math.floor(startIndex / boardSize);
    const endX = endIndex % boardSize;
    const endY = Math.floor(endIndex / boardSize);

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Vérifier si les deux points sont bien sur une même diagonale
    if (Math.abs(deltaX) !== Math.abs(deltaY)) {
        return []; // Pas sur la même diagonale, retournez un tableau vide
    }

    const stepX = deltaX > 0 ? 1 : -1;
    const stepY = deltaY > 0 ? 1 : -1;

    const diagonalIndices = [];
    let currentX = startX + stepX;
    let currentY = startY + stepY;

    while (currentX !== endX && currentY !== endY) {
        diagonalIndices.push(currentY * boardSize + currentX);
        currentX += stepX;
        currentY += stepY;
    }

    return diagonalIndices;
};
