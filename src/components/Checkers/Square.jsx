import { useSelector } from "react-redux";
import Piece from "./Piece";

export default function Square({ onClick, value }) {
    const { ratingsShown } = useSelector((state) => state.checkersSettings);

    return (
        <div
            className={`w-[25px] h-[25px] xxs:w-[30px] xxs:h-[30px] xs:w-[42px] xs:h-[42px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] ${value.color} border border-gray-800 relative text-[8px]/[8px] sm:text-xs`}
        >
            {value.img && <Piece onClick={onClick} value={value} />}
            {ratingsShown && value.dialingId && (
                <p className="absolute top-0">{value.dialingId}</p>
            )}
        </div>
    );
}
