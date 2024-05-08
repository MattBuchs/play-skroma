import Square from "./Square";
import Scoreboard from "./Scoreboard";
import { ratings } from "../../services/checkers/pawn";

export default function Board({ squares, onClick, player }) {
    const renderSquare = (i) => (
        <Square
            key={squares[i].id}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );

    return (
        <div className="flex flex-col justify-center lg:flex-row">
            <section className="grid grid-cols-10 gap-0 select-none">
                {squares.map((_, i) => renderSquare(i))}
            </section>
            <section className="w-full mt-2 lg:h-[800px] lg:w-64 lg:ml-1 lg:mt-0 rounded">
                <Scoreboard
                    squares={squares}
                    player={player}
                    ratings={ratings}
                />
            </section>
        </div>
    );
}
