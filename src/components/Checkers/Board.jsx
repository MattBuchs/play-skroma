import Square from "./Square";
import Scoreboard from "./Scoreboard";
import { piecesEaten } from "../../services/checkers/pawn";
import { useEffect, useState } from "react";
import { calculateWinningChances } from "../../services/checkers/utils";

export default function Board({ squares, onClick, player }) {
    const renderSquare = (i) => (
        <Square
            key={squares[i].id}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );

    const [percentage, setPercentage] = useState({
        white: 50,
        black: 50,
    });

    const [width, setWitdh] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWitdh(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const pawns = [
            { link: "/w-pawn.png", filter: null },
            { link: "/wQ-pawn.png", filter: null },
            { link: "/b-pawn.png", filter: null },
            { link: "/bQ-pawn.png", filter: null },
        ];

        pawns.forEach((pawn) => {
            pawn.filter = squares.filter(
                (square) => square.img === pawn.link
            ).length;
        });

        const [whiteChance, blackChance] = calculateWinningChances(
            pawns[0].filter,
            pawns[1].filter,
            pawns[2].filter,
            pawns[3].filter
        );

        setPercentage({ white: whiteChance, black: blackChance });
    }, [squares]);

    return (
        <div className="flex flex-col justify-center lg:flex-row xs:mt-4 lg:mt-0">
            {width < 1200 && (
                <div
                    className={`flex justify-between p-3 bg-amber-950 rounded border-2 select-none mb-2 ${
                        player === 2
                            ? "border-yellow-500 shadow-md shadow-yellow-700"
                            : "border-black/10 shadow"
                    }`}
                >
                    <div className="flex flex-col justify-around items-center text-white">
                        <div className="flex">
                            <div className="relative">
                                <img
                                    src="/img/checkers/w-pawn.png"
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
                                    src="/img/checkers/wQ-pawn.png"
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
                        <p className="text-lg font-semibold text-white">
                            Player 2
                        </p>
                        <img
                            src="/img/checkers/b-pawn.png"
                            alt=""
                            className="w-12 h-12 mt-1"
                        />
                    </div>
                </div>
            )}
            <section className="grid grid-cols-10 gap-0 select-none">
                {squares.map((_, i) => renderSquare(i))}
            </section>
            <section className="w-full mt-2 lg:h-[800px] lg:w-64 lg:ml-1 lg:mt-0 rounded">
                <Scoreboard
                    player={player}
                    percentage={percentage}
                    width={width}
                />
            </section>
        </div>
    );
}
