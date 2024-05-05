export default function Piece({ onClick, value }) {
    return (
        <button
            onClick={onClick}
            disabled={!value.img}
            className="w-full h-full flex justify-center items-center"
        >
            <img
                src={`/img${value.img}`}
                alt=""
                className={`w-4/5 h-4/5 rounded-full
                ${
                    value.selected ? "border sm:border-4 border-yellow-500" : ""
                }`}
            />
        </button>
    );
}
