import { useNavigate } from "react-router-dom";

export default function MorpionHome() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%]">
            <button
                onClick={() => navigate("/morpion")}
                className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow hover:bg-blue-800"
            >
                Local game
            </button>
            {/* <button
        onClick={handleCreateGame}
        className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
    >
        Create game
    </button>
    <button
        onClick={() => setShowJoinGameModal(true)}
        className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow mt-1 hover:bg-blue-800"
    >
        Join game
    </button> */}
        </section>
    );
}
