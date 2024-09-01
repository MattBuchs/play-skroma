import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        document.title = "PlaySkroma";
    }, []);

    return (
        <div className="pt-14 px-10 h-full w-full flex flex-col items-center">
            <h2 className="text-3xl text-center mt-6 font-bold">
                Welcome to my constantly evolving online gaming site!
            </h2>

            <section className="mt-10 w-full md:w-[700px] divide-y-8">
                <p>
                    I am working tirelessly to expand the game catalog, and new
                    titles will be added regularly. Some games may not yet have
                    an online mode, but rest assured, this could change in the
                    near future.
                </p>
                <p>
                    You may encounter bugs while playing. If you do, please
                    don&apos;t hesitate to contact me by email or through the
                    contact page. Your feedback is invaluable in improving the
                    gaming experience.
                </p>
                <p>
                    Additionally, if you have suggestions for new games, I would
                    be delighted to hear them. Thank you, and have fun!
                </p>
            </section>

            <section className="my-20 w-full">
                <h3 className="text-2xl underline text-center">
                    Games available
                </h3>

                <ul className="flex flex-wrap gap-4 justify-center mt-4">
                    <li className="border border-black rounded-lg overflow-hidden">
                        <Link
                            to="/checkers-home"
                            className="bg-gray-800 border border-gray-700 hover:bg-gray-700 flex flex-col sm:flex-row w-full sm:w-[500px] h-auto sm:h-[250px]"
                        >
                            <div className="w-full sm:w-1/3">
                                <img
                                    className="h-[150px] sm:h-full w-full object-cover"
                                    src="/img/checkers.bmp"
                                    alt=""
                                />
                            </div>
                            <div className="w-full sm:w-2/3 p-4">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                    Checkers
                                </h5>
                                <p className="mb-3 font-normal text-gray-400">
                                    International Checkers is a strategic board
                                    game played on a 10x10 grid. Each player
                                    moves 20 pieces diagonally, aiming to
                                    capture all of the opponent&apos;s pieces or
                                    block them from moving. Simple to start, but
                                    deep in strategy, it&apos;s a classic game
                                    enjoyed worldwide.
                                </p>
                            </div>
                        </Link>
                    </li>
                    <li className="border border-black rounded-lg overflow-hidden">
                        <Link
                            to="/morpion-home"
                            className="bg-gray-800 border border-gray-700 hover:bg-gray-700 flex flex-col sm:flex-row w-full sm:w-[500px] h-auto sm:h-[250px]"
                        >
                            <div className="w-full sm:w-1/3">
                                <img
                                    className="h-[150px] sm:h-full w-full object-cover"
                                    src="/img/morpion.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="w-full sm:w-2/3 p-4">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                    Tic-Tac-Toe
                                </h5>
                                <p className="mb-3 font-normal text-gray-400">
                                    Tic Tac Toe is a simple yet classic game
                                    played on a 3x3 grid. Two players take turns
                                    marking Xs and Os, aiming to align three in
                                    a row vertically, horizontally, or
                                    diagonally. Easy to learn, but always fun
                                    and challenging.
                                </p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}
