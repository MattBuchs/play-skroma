import { useState } from "react";

export default function AddNicknames({ closeModal, setPlayersName }) {
    const [players, setPlayers] = useState({
        player1: "",
        player2: "",
    });

    const updateValue = (e) => {
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
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>

                <div>
                    <label htmlFor="player1">player X name : </label>
                    <input type="text" name="player1" onChange={updateValue} />
                </div>
                <div>
                    <label htmlFor="player2">player O name : </label>
                    <input type="text" name="player2" onChange={updateValue} />
                </div>
                <button onClick={updateNicknames}>Update</button>
            </div>
        </div>
    );
}
