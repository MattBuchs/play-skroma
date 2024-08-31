import { useNavigate } from "react-router-dom";

export default function MorpionHome() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col h-full">
            <h2 className="text-center text-4xl font-bold mt-8 underline">
                Tic-Tac-Toe
            </h2>
            <div className="flex flex-col justify-center items-center h-full px-4 mb-20">
                <button
                    onClick={() => navigate("/morpion")}
                    className="bg-blue-700 text-white px-28 py-5 text-2xl rounded shadow hover:bg-blue-800"
                >
                    Local game
                </button>
            </div>
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
