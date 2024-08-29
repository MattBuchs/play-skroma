import { useDispatch } from "react-redux";
import { displayWinner } from "../../../services/checkers/utils";
import { addWinner } from "../../../features/checkers/checkersGame";

export default function GiveUp({ closeModal, player }) {
    const dispatch = useDispatch();
    const playerLoose = player === 1 ? 2 : 1;

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

                <p className="font-semibold text-xl text-center">
                    Are you sure you want to give up ?
                </p>
                <div className="text-center mt-6 text-white">
                    <button
                        onClick={() => {
                            closeModal();
                            dispatch(addWinner());
                            displayWinner(playerLoose);
                        }}
                        className="w-16 h-8 bg-blue-700 mr-1 rounded hover:bg-blue-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeModal}
                        className="w-16 h-8 bg-red-700 rounded hover:bg-red-600"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
