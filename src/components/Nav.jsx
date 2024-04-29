import { NavLink, Link } from "react-router-dom";

export default function Nav({ display, setDisplay }) {
    return (
        <header className="bg-gray-200 select-none">
            <div
                className={`flex justify-between items-center text-white px-6 h-14 ${
                    display ? "w-full" : "w-48"
                } border-b shadow bg-indigo-900 after:absolute after:w-0 after:h-0 after:left-48 after:border-t-[27px] after:border-b-[28px] after:border-l-[40px] after:border-l-indigo-900 after:border-t-transparent after:border-b-transparent cursor-pointer transition`}
                onClick={() => setDisplay(!display)}
            >
                <h1
                    className="text-xl mb-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link to={"/"}>PlaySkroma</Link>
                </h1>

                {display && (
                    <nav onClick={(e) => e.stopPropagation()}>
                        <ul className="flex text-lg">
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "underline underline-offset-4"
                                            : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="ml-4">
                                <NavLink
                                    to={"/checkers"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "underline underline-offset-4"
                                            : ""
                                    }
                                >
                                    Checkers
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
