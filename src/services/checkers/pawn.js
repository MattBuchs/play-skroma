import {
    checkEnemyWithQueen,
    placeHoldersQueen,
    directions,
} from "./handleQueenPawn.js";
import { checkEnemyWithPawn, placeHoldersPawn } from "./handlePawns.js";

export const ratings = [];

export const handlePawns = (newSquares, i, resultObligation, img, player) => {
    const direction = player === 1 ? "backward" : "forward";
    const opponentPawnType = player === 1 ? "/b-pawn.png" : "/w-pawn.png";
    const opponentQueenType = player === 1 ? "/bQ-pawn.png" : "/wQ-pawn.png";
    const shift1 = !resultObligation ? 9 : 18;
    const shift2 = !resultObligation ? 11 : 22;
    const shift1bis = !resultObligation ? 18 : 9;
    const shift2bis = !resultObligation ? 22 : 11;
    const shiftIndex1 = direction === "forward" ? i + shift1 : i - shift1;
    const shiftIndex2 = direction === "forward" ? i + shift2 : i - shift2;
    const shiftIndex3 = direction !== "forward" ? i + shift1 : i - shift1;
    const shiftIndex4 = direction !== "forward" ? i + shift2 : i - shift2;
    const shiftIndex1bis =
        direction === "forward" ? i + shift1bis : i - shift1bis;
    const shiftIndex2bis =
        direction === "forward" ? i + shift2bis : i - shift2bis;
    const shiftIndex3bis =
        direction !== "forward" ? i + shift1bis : i - shift1bis;
    const shiftIndex4bis =
        direction !== "forward" ? i + shift2bis : i - shift2bis;
    const color = !resultObligation ? "bg-[#86421d]" : "bg-blue-400";

    if (resultObligation) {
        if (
            newSquares[shiftIndex1] &&
            newSquares[shiftIndex1].img === null &&
            (newSquares[shiftIndex1bis].img === opponentPawnType ||
                newSquares[shiftIndex1bis].img === opponentQueenType) &&
            newSquares[shiftIndex1].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex1].img = img;
        }
        if (
            newSquares[shiftIndex2] &&
            newSquares[shiftIndex2].img === null &&
            (newSquares[shiftIndex2bis].img === opponentPawnType ||
                newSquares[shiftIndex2bis].img === opponentQueenType) &&
            newSquares[shiftIndex2].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex2].img = img;
        }
        if (
            newSquares[shiftIndex3] &&
            newSquares[shiftIndex3].img === null &&
            (newSquares[shiftIndex3bis].img === opponentPawnType ||
                newSquares[shiftIndex3bis].img === opponentQueenType) &&
            newSquares[shiftIndex3].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex3].img = img;
        }
        if (
            newSquares[shiftIndex4] &&
            newSquares[shiftIndex4].img === null &&
            (newSquares[shiftIndex4bis].img === opponentPawnType ||
                newSquares[shiftIndex4bis].img === opponentQueenType) &&
            newSquares[shiftIndex4].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex4].img = img;
        }

        return;
    }

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
};

export let piecesEaten = {
    whitePawn: 0,
    whiteQueen: 0,
    blackPawn: 0,
    blackQueen: 0,
};

export const MovePawn = (
    newSquares,
    i,
    pawnChoose,
    player,
    setResultObligation,
    resultObligation,
    isQueen
) => {
    let piece = player === 1 ? "/w-pawn.png" : "/b-pawn.png";
    piece = isQueen ? piece.slice(0, 2) + "Q" + piece.slice(2) : piece;
    const opponentPiece = player === 1 ? "/b-pawn.png" : "/w-pawn.png";
    const queenPiece = player === 1 ? "/bQ-pawn.png" : "/wQ-pawn.png";
    const tempPiece = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const pawnOpacity =
        player === 1 ? "/b-pawn-opacity.png" : "/w-pawn-opacity.png";
    const colorBlue = "bg-blue-400";
    const colorBlueHighlight = "bg-blue-600";
    const colorStandard = "bg-[#86421d]";
    let isReplay;

    newSquares[i].img = piece;
    ratings.push({
        player,
        rating: `${
            newSquares[pawnChoose].dialingId < 10
                ? "0" + newSquares[pawnChoose].dialingId
                : newSquares[pawnChoose].dialingId
        }${resultObligation ? "x" : "-"}${newSquares[i].dialingId}`,
    });

    if (newSquares[i].color === colorBlue) {
        newSquares[i].color = colorStandard;

        if (!isQueen) {
            isReplay = checkEnemyWithPawn(newSquares, i, player, false, false);

            const pawn =
                player === 1
                    ? (newSquares[pawnChoose].id - newSquares[i].id) / 2
                    : (newSquares[i].id - newSquares[pawnChoose].id) / 2;

            const calc = player === 1 ? pawnChoose - pawn : pawnChoose + pawn;

            if (newSquares[calc].img === "/b-pawn.png")
                piecesEaten.whitePawn += 1;
            if (newSquares[calc].img === "/w-pawn.png")
                piecesEaten.blackPawn += 1;
            if (newSquares[calc].img === "/bQ-pawn.png")
                piecesEaten.whiteQueen += 1;
            if (newSquares[calc].img === "/wQ-pawn.png")
                piecesEaten.blackQueen += 1;

            newSquares[calc].img = pawnOpacity;
            if (isReplay.length === 0) newSquares[calc].img = null;
        } else {
            directions.forEach((direction) => {
                if (direction.ennemyPiece) {
                    if (newSquares[direction.position].img === "/b-pawn.png")
                        piecesEaten.whitePawn += 1;
                    if (newSquares[direction.position].img === "/w-pawn.png")
                        piecesEaten.blackPawn += 1;
                    if (newSquares[direction.position].img === "/bQ-pawn.png")
                        piecesEaten.whiteQueen += 1;
                    if (newSquares[direction.position].img === "/wQ-pawn.png")
                        piecesEaten.blackQueen += 1;

                    newSquares[direction.position].img = pawnOpacity;
                    isReplay = checkEnemyWithQueen(
                        newSquares,
                        i,
                        player,
                        false
                    );
                    if (isReplay.length === 0)
                        newSquares[direction.position].img = null;
                }
            });
        }

        setResultObligation(false);
    }

    newSquares.map((el) => {
        if (el.img === tempPiece) el.img = null;
        if (el.id === pawnChoose) el.img = null;
        if (el.color === colorBlueHighlight) el.color = colorStandard;
        if (el.color === colorBlue) el.color = colorStandard;
    });

    if (resultObligation) {
        if (isReplay.length > 0) {
            isReplay = true;
            newSquares[i].color = colorBlueHighlight;
            const newPlayer = player === 1 ? 2 : 1;
            setResultObligation(true);

            if (isQueen)
                placeHoldersQueen(newSquares, i, newPlayer, true, false, true);
            else placeHoldersPawn(newSquares, i, newPlayer, true, false, true);
        } else {
            isReplay = false;
        }

        if (isReplay) return isReplay;
    }

    if (
        newSquares[i].img === "/w-pawn.png" &&
        newSquares[i].id < 10 &&
        newSquares[i].id > 0
    ) {
        newSquares[i].img = "/wQ-pawn.png";
    }

    if (
        newSquares[i].img === "/b-pawn.png" &&
        newSquares[i].id < 100 &&
        newSquares[i].id > 89
    ) {
        newSquares[i].img = "/bQ-pawn.png";
    }

    newSquares.map((el) => {
        if (
            el.img === opponentPiece &&
            checkEnemyWithPawn(newSquares, el.id, player, true, false).length >
                0
        ) {
            el.color = colorBlueHighlight;
            setResultObligation(true);
            placeHoldersPawn(newSquares, el.id, player, true, false, true);
        }

        if (
            el.img === queenPiece &&
            checkEnemyWithQueen(newSquares, el.id, player, true).length > 0
        ) {
            el.color = colorBlueHighlight;
            setResultObligation(true);
            placeHoldersQueen(newSquares, el.id, player, true, false, true);
        }
    });

    return false;
};
