import Piece from "./Piece";

export default function Square({ onClick, value }) {
    return (
        <div
            className={`w-[25px] h-[25px] xxs:w-[30px] xxs:h-[30px] xs:w-[42px] xs:h-[42px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] ${value.color} border border-gray-600`}
        >
            {value.img && <Piece onClick={onClick} value={value} />}
        </div>
    );
}
