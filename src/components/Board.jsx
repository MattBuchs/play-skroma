import Square from "./Square";

export default function Board({ squares, onClick }) {
    const renderSquare = (i) => (
        <Square
            key={squares[i].id}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );

    return (
        <div className="grid grid-cols-10 gap-0">
            {squares.map((_, i) => renderSquare(i))}
        </div>
    );
}
