import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Nav({ display, setDisplay }) {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="bg-gray-200 select-none">
            <div
                className={`flex justify-between items-center text-white px-6 h-14 ${
                    display && size.width > 640
                        ? "sm:w-full cursor-pointer"
                        : "sm:w-48"
                } w-full border-b shadow bg-indigo-900 sm:after:absolute sm:after:w-0 sm:after:h-0 sm:after:left-48 sm:after:border-t-[27px] sm:after:border-b-[28px] sm:after:border-l-[40px] sm:after:border-l-indigo-900 sm:after:border-t-transparent sm:after:border-b-transparent transition`}
                onClick={() => size.width > 640 && setDisplay(!display)}
            >
                <h1
                    className="text-xl mb-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link to={"/"}>PlaySkroma</Link>
                </h1>

                {display ||
                    (size.width <= 640 && (
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
                    ))}
            </div>
        </header>
    );
}
