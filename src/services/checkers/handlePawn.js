import {
    checkEnemyWithQueen,
    placeHoldersQueen,
    directions,
} from "./handleQueenPawn.js";
import { checkReplay } from "./utils";

export const placeHoldersPawn = (
    newSquares,
    i,
    resultObligation,
    img,
    direction,
    opponentPawnType
) => {
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
            newSquares[shiftIndex1bis].img === opponentPawnType &&
            newSquares[shiftIndex1].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex1].img = img;
        }
        if (
            newSquares[shiftIndex2] &&
            newSquares[shiftIndex2].img === null &&
            newSquares[shiftIndex2bis].img === opponentPawnType &&
            newSquares[shiftIndex2].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex2].img = img;
        }
        if (
            newSquares[shiftIndex3] &&
            newSquares[shiftIndex3].img === null &&
            newSquares[shiftIndex3bis].img === opponentPawnType &&
            newSquares[shiftIndex3].color === color
        ) {
            newSquares[i].selected = true;
            newSquares[shiftIndex3].img = img;
        }
        if (
            newSquares[shiftIndex4] &&
            newSquares[shiftIndex4].img === null &&
            newSquares[shiftIndex4bis].img === opponentPawnType &&
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

export const MovePawn = (
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
    const queenPiece = player === 1 ? "/bQ-pawn.svg" : "/wQ-pawn.svg";
    const tempPiece = player === 1 ? "/wp-pawn.svg" : "/bp-pawn.svg";
    const colorBlue = "bg-blue-400";
    const colorBlueHighlight = "bg-blue-600";
    const colorStandard = "bg-[#86421d]";
    const shift1 = 18;
    const shift2 = 22;

    newSquares[i].img = piece;

    if (newSquares[i].color === colorBlue) {
        newSquares[i].color = colorStandard;

        if (!isQueen) {
            const pawn =
                player === 1
                    ? (newSquares[pawnChoose].id - newSquares[i].id) / 2
                    : (newSquares[i].id - newSquares[pawnChoose].id) / 2;

            const calc = player === 1 ? pawnChoose - pawn : pawnChoose + pawn;
            newSquares[calc].img = null;
        } else {
            directions.forEach((direction) => {
                if (direction.ennemyPiece) {
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
        let isReplay;
        if (isQueen) {
            isReplay = checkEnemyWithQueen(newSquares, i, player, false);

            if (isReplay.length > 0) {
                isReplay = true;
                newSquares[i].color = colorBlueHighlight;
                setResultObligation(true);
                placeHoldersQueen(newSquares, i, player, true, false, false);
            } else {
                isReplay = false;
            }
        } else {
            isReplay = checkReplay(newSquares, i, setResultObligation);
        }

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
