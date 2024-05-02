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
    }, [setDisplay, size]);

    return (
        <header className="bg-gray-200 select-none">
            <div
                className={`flex justify-between items-center text-white px-2 h-[74px] ${
                    display && size.width > 640
                        ? "sm:w-full cursor-pointer"
                        : "sm:w-56"
                } w-full border-b shadow bg-indigo-900 sm:after:absolute sm:after:w-0 sm:after:h-0 sm:after:left-[224px] sm:after:border-t-[37px] sm:after:border-b-[36px] sm:after:border-l-[46px] sm:after:border-l-indigo-900 sm:after:border-t-transparent sm:after:border-b-transparent transition`}
                onClick={() => size.width > 640 && setDisplay(!display)}
            >
                <div className="flex items-center">
                    {size.width > 400 && (
                        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
                    )}
                    <h1
                        className="text-xl mb-1 ml-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link to={"/"}>PlaySkroma</Link>
                    </h1>
                </div>

                {(display || size.width <= 640) && (
                    <nav onClick={(e) => e.stopPropagation()} className="mr-4">
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
