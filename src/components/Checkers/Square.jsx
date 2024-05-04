import Piece from "./Piece";

export default function Square({ onClick, value, index }) {
    const totalColumns = 10;
    const isFirstColumn = index % totalColumns === 0;
    const lineNumber = totalColumns - Math.floor(index / totalColumns);
    const letter = String.fromCharCode(65 + (index % totalColumns));

    return (
        <div
            className={`w-[25px] h-[25px] xxs:w-[30px] xxs:h-[30px] xs:w-[42px] xs:h-[42px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] ${value.color} border border-gray-800 relative text-[8px]/[8px] sm:text-xs`}
        >
            {value.img && <Piece onClick={onClick} value={value} />}
            {isFirstColumn && (
                <span className="absolute top-0 xxs:ml-0.5 sm:ml-1">
                    {lineNumber}
                </span>
            )}
            {lineNumber === 1 && (
                <span className="absolute bottom-0 right-0 xxs:mr-0.5 sm:mr-1">
                    {letter}
                </span>
            )}
        </div>
    );
}
