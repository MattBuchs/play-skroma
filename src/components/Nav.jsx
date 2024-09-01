import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { displayNavbar } from "../features/navbar";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { isDisplayNav } = useSelector((state) => state.navbar);
    const { isAuthenticated } = useSelector((state) => state.user);
    const menuRef = useRef(null);

    const handleNavigation = () => {
        dispatch(displayNavbar());
        navigate("/");
    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Empêche la propagation pour éviter que `handleClickOutside` se déclenche
        setShowMenu((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setTimeout(() => {
                    setShowMenu(false);
                }, 150); // Délai court pour permettre au clic de se propager correctement
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gray-200 select-none">
            {isDisplayNav && (
                <div className="flex justify-between items-center text-white h-[74px] px-2 w-full border-b shadow bg-indigo-900">
                    <div className="flex items-center">
                        <h1 className="text-xl mb-1 ml-1 flex items-center">
                            <img
                                src="/img/logo.png"
                                alt="Logo"
                                className="w-16 h-16 mr-1"
                            />
                            <Link to={"/"} className="hidden xxs:block">
                                PlaySkroma
                            </Link>
                        </h1>
                    </div>

                    <nav className="mr-4">
                        <ul className="flex text-lg">
                            <li className="hover:underline">
                                <button
                                    onClick={toggleMenu}
                                    className="mr-1 fill-white flex items-center"
                                >
                                    Games
                                    <img
                                        src="/img/chevron.svg"
                                        alt="menu"
                                        className="w-4 h-4 ml-1 mt-0.5"
                                    />
                                </button>
                            </li>
                            <li className="ml-4">
                                <NavLink
                                    to={isAuthenticated ? "/profile" : "/login"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "underline underline-offset-4"
                                            : ""
                                    }
                                >
                                    {isAuthenticated ? "Profile" : "Login"}
                                </NavLink>
                            </li>
                        </ul>
                        {showMenu && (
                            <div
                                ref={menuRef}
                                className="absolute right-12 top-[65px] z-10 bg-stone-50 text-black rounded-lg border border-gray-400/60 shadow w-40 after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-b-[18px] after:border-b-stone-50 after:border-r-[12px] after:border-r-transparent after:absolute after:-top-4 after:left-1/2 after:-translate-x-1/2"
                            >
                                <ul className="py-2 text-lg">
                                    <li
                                        onClick={() => setShowMenu(false)}
                                        className="w-full hover:bg-stone-200 text-center pb-1"
                                    >
                                        <NavLink
                                            to={"/checkers-home"}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "underline underline-offset-4 px-4"
                                                    : "px-4"
                                            }
                                        >
                                            Checkers
                                        </NavLink>
                                    </li>
                                    <li
                                        onClick={() => setShowMenu(false)}
                                        className="w-full hover:bg-stone-200 text-center pb-1"
                                    >
                                        <NavLink
                                            to={"/morpion-home"}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "underline underline-offset-4 px-4"
                                                    : "px-4"
                                            }
                                        >
                                            Morpion
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </nav>
                </div>
            )}
            {!isDisplayNav && (
                <div className="w-full xs:w-10 h-14 xs:h-10 xs:m-1.5 xs:fixed bg-indigo-900 xs:bg-transparent">
                    <button
                        onClick={handleNavigation}
                        className="w-full h-full flex justify-center items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="fill-white xs:fill-indigo-900 w-10 h-10"
                        >
                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                    </button>
                </div>
            )}
        </header>
    );
}
