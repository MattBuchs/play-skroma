import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddNicknames from "../../components/Mopion/Modal/AddNicknames";

export default function MorpionGame() {
    const tableRef = useRef();
    const [player, setPlayer] = useState(1);
    const [playersName, setPlayersName] = useState({
        player1: "X",
        player2: "O",
    });
    const [winner, setWinner] = useState("");
    const [modal, setModal] = useState(false);
    const [table, setTable] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    const displayContent = (value) => {
        if (value === 0) return "";
        if (value === 1) return "X";
        if (value === -1) return "O";
    };

    const handleGame = (e, indexRow, indexCol) => {
        if (winner === "") {
            const value = e.target.textContent;

            if (!value) {
                const newTable = [...table];
                const newRow = [...newTable[indexRow]];

                newRow[indexCol] = player === 1 ? 1 : -1;
                newTable[indexRow] = newRow;

                setTable(newTable);

                setPlayer(player === 1 ? 2 : 1);
            }
        }
    };

    const resetGame = () => {
        setPlayer(1);
        setWinner("");
        setTable([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    };

    const checkSum = (sum) => {
        if (sum === 3) return setWinner("cross");
        if (sum === -3) return setWinner("circle");
    };

    useEffect(() => {
        for (let i = 0; i < table.length; i++) {
            let sum = 0;

            for (let j = 0; j < table.length; j++) {
                sum += table[i][j];
                checkSum(sum);
            }
        }

        for (let i = 0; i < table.length; i++) {
            let sum = 0;

            for (let j = 0; j < table.length; j++) {
                sum += table[j][i];
                checkSum(sum);
            }
        }

        const rightDiad = table[0][0] + table[1][1] + table[2][2];
        checkSum(rightDiad);

        const leftDiad = table[0][2] + table[1][1] + table[2][0];
        checkSum(leftDiad);
    }, [table]);

    return (
        <div className="h-full">
            <h2 className="text-center text-4xl font-bold mt-6">Morpion</h2>

            <div className="flex flex-col justify-center items-center mt-36">
                {winner === "" && (
                    <p className="mb-2 text-xl">
                        Player{" "}
                        {player === 1
                            ? playersName.player1
                            : playersName.player2}{" "}
                        turn
                    </p>
                )}
                {winner && winner === "equality" && (
                    <p className="mb-2 text-xl">Equality</p>
                )}
                {winner && winner !== "equality" && (
                    <p className="mb-2 text-xl">
                        Player{" "}
                        {winner === "cross"
                            ? playersName.player1
                            : playersName.player2}{" "}
                        wins !
                    </p>
                )}
                <table
                    ref={tableRef}
                    className="border-2 border-gray-600 w-[300px] h-[300px] mb-4 select-none"
                >
                    <tbody>
                        {table &&
                            table.map((row, indexRow) => (
                                <tr key={indexRow}>
                                    {row.map((box, indexCol) => (
                                        <td
                                            key={`${indexRow}-${indexCol}`}
                                            onClick={(e) =>
                                                handleGame(
                                                    e,
                                                    indexRow,
                                                    indexCol
                                                )
                                            }
                                            className="w-1/3 h-1/3 border border-gray-800 text-center text-6xl cursor-pointer"
                                        >
                                            {displayContent(box)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div>
                    <button
                        onClick={resetGame}
                        className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setModal(true)}
                        className="bg-blue-600 text-white px-4 py-1 rounded"
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
