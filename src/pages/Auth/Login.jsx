import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../features/user";
import { useDispatch } from "react-redux";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [infos, setInfos] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        global: "",
    });

    const handleInfos = (e) => {
        setErrorMessage({
            email: "",
            password: "",
            global: "",
        });
        setInfos({ ...infos, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setErrorMessage({
            email: "",
            password: "",
            global: "",
        });

        const email = infos.email.toLowerCase().trim();
        const pass = infos.password.trim();
        const errors = {};

        if (!email) errors.email = "invalid email.";
        if (!pass) errors.password = "invalid password.";

        if (Object.keys(errors).length > 0) {
            setErrorMessage(errors);
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/signin`, {
                method: "POST", // Utilisez "POST" en majuscules pour être cohérent avec les conventions HTTP
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(infos),
            })
                .then((res) => {
                    // Vérifiez si la réponse du serveur est correcte (statut HTTP 2xx)
                    if (!res.ok) {
                        return res.json().then((data) => {
                            throw new Error(data.error || "Unknown error");
                        });
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data.token) {
                        dispatch(getToken(data.token));
                        navigate("/");
                    }
                })
                .catch((error) => {
                    let errorMessage;
                    switch (error.message) {
                        case "Missing values":
                            errorMessage = {
                                email: "",
                                password: "",
                                global: "Missing values",
                            };
                            break;
                        case "Invalid email":
                            errorMessage = {
                                ...errorMessage,
                                email: "Invalid email",
                            };
                            break;
                        case "Incorrect email or password":
                            errorMessage = {
                                email: "",
                                password: "",
                                global: "Incorrect email or password",
                            };
                            break;
                        default:
                            errorMessage = {
                                email: "",
                                password: "",
                                global: "An error has occurred.",
                            };
                            break;
                    }
                    setErrorMessage(errorMessage);
                });
        }
    };

    return (
        <section className="bg-gray-200 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form
                            onSubmit={handleLogin}
                            className="space-y-3 md:space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.email && (
                                    <small className="text-red-600 block ml-0.5">
                                        {errorMessage.email}
                                    </small>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.password && (
                                    <small className="text-red-600 block ml-0.5">
                                        {errorMessage.password}
                                    </small>
                                )}
                            </div>
                            <div className="text-end">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline block -mt-3"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                {errorMessage.global && (
                                    <small className="text-red-600 block ml-0.5">
                                        {errorMessage.global}
                                    </small>
                                )}
                            </div>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link
                                    to={"/signup"}
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
