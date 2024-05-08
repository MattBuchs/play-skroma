import { useEffect, useRef, useState } from "react";
import { calculateWinningChances } from "../../services/checkers/utils";
import { piecesEaten } from "../../services/checkers/pawn";
import { createPortal } from "react-dom";
import Settings from "./Modal/Settings";

export default function Scoreboard({ squares, player, ratings }) {
    const scrollRef = useRef(null);
    const scrollHeightRef = useRef(0);
    const [showModal, setShowModal] = useState(false);
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

    useEffect(() => {
        const scrollDiv = scrollRef.current;
        if (scrollDiv) {
            const currentScrollHeight = scrollDiv.scrollHeight;
            // Vérifier si la hauteur du contenu a augmenté
            if (currentScrollHeight !== scrollHeightRef.current) {
                scrollHeightRef.current = currentScrollHeight;
                scrollDiv.scrollTop =
                    scrollDiv.scrollHeight - scrollDiv.clientHeight;
            }
        }
    }); // Aucune dépendance

    return (
        <>
            <div className="flex flex-col lg:flex-col-reverse justify-between h-full text-white">
                <div
                    className={`flex justify-between p-3 bg-amber-950 rounded border-2 select-none ${
                        player === 1
                            ? "border-yellow-500 shadow-md shadow-yellow-700"
                            : "border-black shadow"
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">Player 1</p>
                        <img
                            src="/img/w-pawn.png"
                            alt=""
                            className="w-12 h-12 mt-1"
                        />
                    </div>
                    <div className="flex flex-col justify-around items-center">
                        <div className="flex">
                            <div className="relative">
                                <img
                                    src="/img/b-pawn.png"
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
                                    src="/img/bQ-pawn.png"
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
                <div className="bg-amber-950 h-full my-2 rounded p-4 flex flex-col items-center justify-between relative">
                    <p className="text-4xl font-semibold">10:00</p>
                    <div className="flex flex-col items-center w-full">
                        <div
                            ref={scrollRef}
                            className="bg-black/30 h-72 w-full flex flex-col items-center overflow-auto rounded"
                        >
                            {ratings.map((rating, index) => (
                                <p
                                    key={index}
                                    className="odd:bg-yellow-700 even:bg-amber-900 w-full text-center py-1 relative"
                                >
                                    <span className="absolute left-2">
                                        P{rating.player}.
                                    </span>{" "}
                                    {rating.rating}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-col items-center w-full mt-8">
                            <button className="bg-blue-600 py-1 rounded w-3/4 m-1 hover:bg-blue-700">
                                Give up
                            </button>
                            <button className="bg-blue-600 py-1 rounded w-3/4 m-1 hover:bg-blue-700">
                                Request a Draw ?
                            </button>
                        </div>
                    </div>
                    <p className="text-4xl font-semibold">10:00</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="absolute bottom-2 right-2 "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-6 h-6 fill-white hover:fill-slate-300"
                        >
                            -Font Awesome Free 6.5.2 by @fontawesome -
                            https://fontawesome.com License -
                            https://fontawesome.com/license/free Copyright 2024
                            Fonticons, Inc.
                            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                        </svg>
                    </button>
                </div>
                <div
                    className={`flex justify-between p-3 bg-amber-950 rounded border-2 select-none ${
                        player === 2
                            ? "border-yellow-500 shadow-md shadow-yellow-700"
                            : "border-black shadow"
                    }`}
                >
                    <div className="flex flex-col justify-around items-center">
                        <div className="flex">
                            <div className="relative">
                                <img
                                    src="/img/w-pawn.png"
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
                                    src="/img/wQ-pawn.png"
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
                        <img
                            src="/img/b-pawn.png"
                            alt=""
                            className="w-12 h-12 mt-1"
                        />
                    </div>
                </div>
            </div>
            {showModal &&
                createPortal(
                    <Settings closeModal={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}
