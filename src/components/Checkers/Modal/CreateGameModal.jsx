import { useSelector } from "react-redux";

export default function CreateGameModal({ closeModal }) {
    const { gameID } = useSelector((state) => state.checkersGame);

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-400 text-slate-900 px-10 py-5 rounded relative mb-[8vh] w-[500px]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>

                <h2>Game created</h2>
                <p>
                    Game ID : <span>{gameID}</span>
                </p>
            </div>
        </div>
    );
}
