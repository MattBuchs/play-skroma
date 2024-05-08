import { useDispatch, useSelector } from "react-redux";
import { ratingsRatings } from "../../../features/checkersSettings";

export default function Settings({ closeModal }) {
    const dispatch = useDispatch();
    const { ratingsShown } = useSelector((state) => state.checkersSettings);

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

                <h2 className="font-semibold text-xl text-center">Settings</h2>

                <input
                    type="checkbox"
                    id="ratings"
                    checked={ratingsShown}
                    onChange={() => dispatch(ratingsRatings())}
                />
                <label htmlFor="ratings" className="select-none ml-2">
                    show/hide ratings
                </label>
            </div>
        </div>
    );
}
