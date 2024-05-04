import { useEffect, useState } from "react";
import { calculateWinningChances } from "../../services/checkers/utils";
import { piecesEaten } from "../../services/checkers/handlePawn";

export default function Scoreboard({ squares, player }) {
    const [percentage, setPercentage] = useState({
        white: 50,
        black: 50,
    });

    useEffect(() => {
        const whitePawns = squares.filter(
            (square) => square.img === "/w-pawn.png"
        ).length;
        const whiteQueen = squares.filter(
            (square) => square.img === "/wQ-pawn.png"
        ).length;
        const blackPawns = squares.filter(
            (square) => square.img === "/b-pawn.png"
        ).length;
        const blackQueen = squares.filter(
            (square) => square.img === "/bQ-pawn.png"
        ).length;

        const [whiteChance, blackChance] = calculateWinningChances(
            whitePawns,
            whiteQueen,
            blackPawns,
            blackQueen
        );

        setPercentage({ white: whiteChance, black: blackChance });
    }, [squares]);

    return (
        <div className="flex flex-col lg:flex-col-reverse justify-between h-full text-white">
            <div
                className={`flex justify-between p-3 bg-amber-950 rounded ${
                    player === 1
                        ? "border-2 border-yellow-500 shadow-md shadow-yellow-700"
                        : "border border-black shadow"
                }`}
            >
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Player 1</p>
                    <img src="/w-pawn.png" alt="" className="w-12 h-12 mt-1" />
                </div>
                <div className="flex flex-col justify-around items-center">
                    <div className="flex">
                        <div className="relative">
                            <img
                                src="/b-pawn.png"
                                alt=""
                                className="w-8 h-8 m-1"
                            />
                            <p className="w-5 h-5 bg-white rounded-full absolute bottom-0 right-0 shadow">
                                <span className="text-black flex justify-center items-center h-full text-sm font-semibold shadow">
                                    {piecesEaten.whitePawn}
                                </span>
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="/bQ-pawn.png"
                                alt=""
                                className="w-8 h-8 m-1"
                            />
                            <p className="w-5 h-5 bg-white rounded-full absolute bottom-0 right-0 shadow">
                                <span className="text-black flex justify-center items-center h-full text-sm font-semibold shadow">
                                    {piecesEaten.whiteQueen}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="text-lg font-semibold ml-1">
                        {percentage.white}%
                    </p>
                </div>
            </div>
            <div className="bg-amber-950 h-full my-2 rounded p-4 flex flex-col items-center justify-between">
                <p className="text-4xl font-semibold">10:00</p>
                <div className="flex flex-col items-center w-full">
                    <button className="bg-blue-600 py-1 rounded w-3/4 m-1 hover:bg-blue-700">
                        Give up
                    </button>
                    <button className="bg-blue-600 py-1 rounded w-3/4 m-1 hover:bg-blue-700">
                        Request a Draw ?
                    </button>
                </div>
                <p className="text-4xl font-semibold">10:00</p>
            </div>
            <div
                className={`flex justify-between p-3 bg-amber-950 rounded ${
                    player === 2
                        ? "border-2 border-yellow-500 shadow-md shadow-yellow-700"
                        : "border border-black shadow"
                }`}
            >
                <div className="flex flex-col justify-around items-center">
                    <div className="flex">
                        <div className="relative">
                            <img
                                src="/w-pawn.png"
                                alt=""
                                className="w-8 h-8 m-1"
                            />
                            <p className="w-5 h-5 bg-black rounded-full absolute bottom-0 right-0 shadow">
                                <span className="text-white flex justify-center items-center h-full text-sm font-semibold shadow">
                                    {piecesEaten.blackPawn}
                                </span>
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="/wQ-pawn.png"
                                alt=""
                                className="w-8 h-8 m-1"
                            />
                            <p className="w-5 h-5 bg-black rounded-full absolute bottom-0 right-0 shadow">
                                <span className="text-white flex justify-center items-center h-full text-sm font-semibold shadow">
                                    {piecesEaten.blackQueen}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="text-lg font-semibold ml-1">
                        {percentage.black}%
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Player 2</p>
                    <img src="/b-pawn.png" alt="" className="w-12 h-12 mt-1" />
                </div>
            </div>
        </div>
    );
}
