import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddNicknames from "../../components/Mopion/Modal/AddNicknames";

export default function MorpionGame() {
    const tableRef = useRef();
    const [player, setPlayer] = useState(1);
    const [startingPlayer, setStartingPlayer] = useState(1);
    const [playersName, setPlayersName] = useState({
        player1: "X",
        player2: "O",
    });
    const [score, setScore] = useState({
        player1: 0,
        player2: 0,
    });
    const [winner, setWinner] = useState("");
    const [modal, setModal] = useState(false);
    const [showReplayButton, setShowReplayButton] = useState(false);
    const [table, setTable] = useState([
        [
            { value: 0, className: "" },
            { value: 0, className: "" },
            { value: 0, className: "" },
        ],
        [
            { value: 0, className: "" },
            { value: 0, className: "" },
            { value: 0, className: "" },
        ],
        [
            { value: 0, className: "" },
            { value: 0, className: "" },
            { value: 0, className: "" },
        ],
    ]);

    const displayContent = (value) => {
        if (value === 0) return "";
        if (value === 1) return "X";
        if (value === -1) return "O";
    };

    const handleGame = (indexRow, indexCol) => {
        if (winner === "") {
            const cell = table[indexRow][indexCol];

            if (cell.value === 0) {
                const newTable = table.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                        if (rIdx === indexRow && cIdx === indexCol) {
                            return {
                                value: player === 1 ? 1 : -1,
                                className:
                                    player === 1
                                        ? "text-red-700"
                                        : "text-blue-700",
                            };
                        }
                        return cell;
                    })
                );

                setTable(newTable);
                setPlayer(player === 1 ? 2 : 1);
            }
        }
    };

    const resetGame = (isReplay) => {
        if (isReplay) {
            setStartingPlayer(startingPlayer === 1 ? 2 : 1);
            setPlayer(startingPlayer === 1 ? 2 : 1);
        } else {
            setPlayer(1);
            setScore({
                player1: 0,
                player2: 0,
            });
        }

        tableRef.current.classList.remove("blur-sm");
        setShowReplayButton(false);
        setWinner("");
        setTable([
            [
                { value: 0, className: "" },
                { value: 0, className: "" },
                { value: 0, className: "" },
            ],
            [
                { value: 0, className: "" },
                { value: 0, className: "" },
                { value: 0, className: "" },
            ],
            [
                { value: 0, className: "" },
                { value: 0, className: "" },
                { value: 0, className: "" },
            ],
        ]);
    };

    const checkSum = (sum) => {
        if (sum === 3) return setWinner("cross");
        if (sum === -3) return setWinner("circle");
    };

    const checkEquality = () => {
        return table.every((row) => row.every((cell) => cell.value !== 0));
    };

    useEffect(() => {
        const isEquality = checkEquality();

        if (isEquality) setWinner("equality");

        for (let i = 0; i < table.length; i++) {
            let sum = 0;

            for (let j = 0; j < table.length; j++) {
                sum += table[i][j].value;
                checkSum(sum);
            }
        }

        for (let i = 0; i < table.length; i++) {
            let sum = 0;

            for (let j = 0; j < table.length; j++) {
                sum += table[j][i].value;
                checkSum(sum);
            }
        }

        const rightDiad =
            table[0][0].value + table[1][1].value + table[2][2].value;
        checkSum(rightDiad);

        const leftDiad =
            table[0][2].value + table[1][1].value + table[2][0].value;
        checkSum(leftDiad);
    }, [table]);

    useEffect(() => {
        if (winner) {
            if (winner === "cross")
                setScore({ ...score, player1: (score.player1 += 1) });
            if (winner === "circle")
                setScore({ ...score, player2: (score.player2 += 1) });

            setShowReplayButton(true);
            tableRef.current.classList.add("blur-sm");
        }
    }, [winner]);

    return (
        <div className="h-full">
            <h2 className="text-center text-4xl font-bold mt-6">Morpion</h2>
            <p className="text-center text-3xl mt-4">
                <span className="text-red-700 font-bold">{score.player1}</span>{" "}
                /{" "}
                <span className="text-blue-700 font-bold">{score.player2}</span>
            </p>

            <div className="flex flex-col justify-center items-center my-8 sm:my-20">
                {winner === "" && (
                    <p className="mb-2 text-xl">
                        Player{" "}
                        <span
                            className={`font-bold ${
                                player === 1 ? "text-red-700" : "text-blue-700"
                            }`}
                        >
                            {player === 1
                                ? playersName.player1
                                : playersName.player2}
                        </span>{" "}
                        turn
                    </p>
                )}
                {winner && winner === "equality" && (
                    <p className="mb-2 text-xl">Equality !</p>
                )}
                {winner && winner !== "equality" && (
                    <p className="mb-2 text-xl">
                        Player{" "}
                        <span
                            className={`font-bold ${
                                winner === "cross"
                                    ? "text-red-700"
                                    : "text-blue-700"
                            }`}
                        >
                            {winner === "cross"
                                ? playersName.player1
                                : playersName.player2}
                        </span>{" "}
                        wins !
                    </p>
                )}
                {showReplayButton && (
                    <button
                        onClick={() => resetGame(true)}
                        className="bg-blue-700 px-6 py-1.5 rounded text-white absolute z-10 text-2xl border border-gray-600 shadow-lg  hover:bg-blue-800"
                    >
                        Replay
                    </button>
                )}
                <table
                    ref={tableRef}
                    className="morpion border-2 border-gray-600 w-[300px] h-[300px] mb-4 select-none"
                >
                    <tbody>
                        {table &&
                            table.map((row, indexRow) => (
                                <tr key={indexRow}>
                                    {row.map((cell, indexCol) => (
                                        <td
                                            key={`${indexRow}-${indexCol}`}
                                            onClick={() =>
                                                handleGame(indexRow, indexCol)
                                            }
                                            className={`w-1/3 h-1/3 border border-gray-800 text-center text-6xl cursor-pointer ${cell.className}`}
                                        >
                                            {displayContent(cell.value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div>
                    <button
                        onClick={() => resetGame(false)}
                        className="bg-blue-600 text-white px-4 py-1 rounded mr-2 hover:bg-blue-800"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setModal(true)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
                    >
                        Add nicknames
                    </button>
                </div>
            </div>
            {modal &&
                createPortal(
                    <AddNicknames
                        closeModal={() => setModal(false)}
                        setPlayersName={setPlayersName}
                    />,
                    document.body
                )}
        </div>
    );
}
