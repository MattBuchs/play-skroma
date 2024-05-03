export const initializeSquares = () => {
    return Array(100)
        .fill(null)
        .map((_, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const isBlackSquare = (row + col) % 2 !== 0;
            const color = isBlackSquare ? "bg-[#86421d]" : "bg-[#d2a973]";
            if (isBlackSquare) {
                if (row < 1)
                    return {
                        id: index,
                        img: "/b-pawn.png",
                        color,
                        selected: false,
                    };
                else if (row > 5)
                    return {
                        id: index,
                        img: "/w-pawn.png",
                        color,
                        selected: false,
                    };
            }
            return {
                id: index,
                img: null,
                color,
                selected: false,
            };
        });
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
    const enemyPiece = pawn === "/w-pawn.png" ? "/b-pawn.png" : "/w-pawn.png";
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

export const checkWinner = (squares, player, img, setWinner, setPlayer) => {
    const checkPawns = squares.find((square) => square.img === img);

    if (!checkPawns) {
        setWinner(true);
        return alert(`Le Joueur ${player} à gagné !`);
    }

    const whoNext = player === "1" ? 2 : 1;

    return setPlayer(Number(whoNext));
};
