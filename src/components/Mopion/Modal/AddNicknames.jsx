import { useState } from "react";

export default function AddNicknames({ closeModal, setPlayersName }) {
    const [players, setPlayers] = useState({
        player1: "",
        player2: "",
    });

    const updateValue = (e) => {
        console.log(e.target.value.length);

        if (e.target.value.length < 20)
            setPlayers({ ...players, [e.target.name]: e.target.value });
    };

    const updateNicknames = () => {
        const player1 = players.player1 || "X";
        const player2 = players.player2 || "O";

        setPlayersName({ player1, player2 });
        closeModal();
    };

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
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center font-bold hover:bg-red-700"
                >
                    <span className="mb-0.5">X</span>
                </button>

                <h2 className="text-xl font-bold underline mb-4">
                    Add nicknames
                </h2>
                <div className="mb-2">
                    <label htmlFor="player1" className="mr-[3px]">
                        player X name :{" "}
                    </label>
                    <input
                        type="text"
                        name="player1"
                        onChange={updateValue}
                        max={20}
                        value={players.player1}
                        className="px-1 py-0.5"
                    />
                </div>
                <div>
                    <label htmlFor="player2">player O name : </label>
                    <input
                        type="text"
                        name="player2"
                        onChange={updateValue}
                        max={20}
                        value={players.player2}
                        className="px-1 py-0.5"
                    />
                </div>
                <button
                    onClick={updateNicknames}
                    className="bg-blue-700 mt-4 text-white rounded px-4 py-1 hover:bg-blue-800"
                >
                    Update
                </button>
            </div>
        </div>
    );
}
