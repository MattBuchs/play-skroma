export const initializeSquares = () => {
    return Array(100)
        .fill(null)
        .map((_, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const isBlackSquare = (row + col) % 2 !== 0;
            const color = isBlackSquare ? "bg-[#86421d]" : "bg-[#d2a973]";
            if (isBlackSquare) {
                if (row < 3)
                    return {
                        id: index,
                        img: "/b-pawn.svg",
                        color,
                        selected: false,
                        isQueen: false,
                    };
                else if (row > 5)
                    return {
                        id: index,
                        img: "/w-pawn.svg",
                        color,
                        selected: false,
                        isQueen: false,
                    };
            }
            return {
                id: index,
                img: null,
                color,
                selected: false,
                isQueen: false,
            };
        });
};
