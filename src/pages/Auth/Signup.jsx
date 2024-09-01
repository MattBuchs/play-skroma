import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import passwordSecurityMiddleware from "../../validation/passwordSchema";

export default function Signup() {
    const navigate = useNavigate();
    const [infos, setInfos] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        global: "",
    });
    const [conditionsPass, setConditionsPass] = useState({
        characters: true,
        lowercase: true,
        uppercase: true,
        digit: true,
        specialCharacter: true,
    });

    const handleInfos = (e) => {
        setErrorMessage({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            global: "",
        });
        setInfos({ ...infos, [e.target.name]: e.target.value });

        if (e.target.name === "password") {
            const isValidPassword = passwordSecurityMiddleware(e.target.value);

            if (isValidPassword) {
                let errorMessage;

                isValidPassword.forEach((error) => {
                    switch (error) {
                        case "characters":
                            errorMessage = {
                                ...errorMessage,
                                characters: true,
                            };
                            break;
                        case "lowercase":
                            errorMessage = {
                                ...errorMessage,
                                lowercase: true,
                            };
                            break;
                        case "uppercase":
                            errorMessage = {
                                ...errorMessage,
                                uppercase: true,
                            };
                            break;
                        case "digit":
                            errorMessage = {
                                ...errorMessage,
                                digit: true,
                            };
                            break;
                        case "special character":
                            errorMessage = {
                                ...errorMessage,
                                specialCharacter: true,
                            };
                            break;
                    }
                });

                setConditionsPass(errorMessage);
            } else {
                setConditionsPass({
                    characters: false,
                    lowercase: false,
                    uppercase: false,
                    digit: false,
                    specialCharacter: false,
                });
            }
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();

        const username = infos.username.trim();
        const email = infos.email.toLowerCase().trim();
        const pass = infos.password.trim();
        const confirmPass = infos.confirmPassword.trim();
        const errors = {};

        if (!username) errors.username = "invalid username.";
        if (!email) errors.email = "invalid email.";
        if (!pass) errors.password = "invalid password.";
        if (!confirmPass) errors.confirmPassword = "invalid confirm password.";

        if (Object.keys(errors).length > 0) {
            setErrorMessage(errors);
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(infos),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((data) => {
                            throw new Error(data.error || "Unknown error");
                        });
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) navigate("/login");
                })
                .catch((error) => {
                    let errorMessage;
                    switch (error.message) {
                        case "Missing values":
                            errorMessage = {
                                ...errorMessage,
                                global: "Missing values",
                            };
                            break;
                        case "Invalid email":
                            errorMessage = {
                                ...errorMessage,
                                email: "Invalid email",
                            };
                            break;
                        case "The password must match what is indicated":
                            errorMessage = {
                                ...errorMessage,
                                global: "The password must match what is indicated",
                            };
                            break;
                        case "Password and confirm password are not the same":
                            errorMessage = {
                                ...errorMessage,
                                confirmPassword:
                                    "Password and confirm password are not the same",
                            };
                            break;
                        case "This username already exists":
                            errorMessage = {
                                ...errorMessage,
                                username: "This username already exists",
                            };
                            break;
                        case "This email already exists":
                            errorMessage = {
                                ...errorMessage,
                                email: "This email already exists",
                            };
                            break;
                        default:
                            errorMessage = {
                                ...errorMessage,
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
                            Create an account
                        </h1>
                        <form
                            onSubmit={handleSignup}
                            className="space-y-3 md:space-y-4"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="username"
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name123"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.username && (
                                    <small className="text-red-600 block mr-0.5 absolute right-0">
                                        {errorMessage.username}
                                    </small>
                                )}
                            </div>
                            <div className="relative">
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.email && (
                                    <small className="text-red-600 block mr-0.5 absolute right-0">
                                        {errorMessage.email}
                                    </small>
                                )}
                            </div>
                            <div className="relative">
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.password && (
                                    <small className="text-red-600 block mr-0.5 absolute right-0">
                                        {errorMessage.password}
                                    </small>
                                )}
                                <div className="flex flex-col ml-1">
                                    <small
                                        className={`${
                                            !conditionsPass.characters
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } flex items-center`}
                                    >
                                        <img
                                            src={
                                                !conditionsPass.characters
                                                    ? "/img/check.svg"
                                                    : "/img/cross.svg"
                                            }
                                            className="w-4 h-4 mt-0.5 mr-1"
                                            alt=""
                                        />{" "}
                                        <span>12 characters minimum</span>
                                    </small>
                                    <small
                                        className={`${
                                            !conditionsPass.lowercase
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } flex items-center`}
                                    >
                                        <img
                                            src={
                                                !conditionsPass.lowercase
                                                    ? "/img/check.svg"
                                                    : "/img/cross.svg"
                                            }
                                            className="w-4 h-4 mt-0.5 mr-1"
                                            alt=""
                                        />{" "}
                                        a lowercase
                                    </small>
                                    <small
                                        className={`${
                                            !conditionsPass.uppercase
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } flex items-center`}
                                    >
                                        <img
                                            src={
                                                !conditionsPass.uppercase
                                                    ? "/img/check.svg"
                                                    : "/img/cross.svg"
                                            }
                                            className="w-4 h-4 mt-0.5 mr-1"
                                            alt=""
                                        />{" "}
                                        a uppercase
                                    </small>
                                    <small
                                        className={`${
                                            !conditionsPass.digit
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } flex items-center`}
                                    >
                                        <img
                                            src={
                                                !conditionsPass.digit
                                                    ? "/img/check.svg"
                                                    : "/img/cross.svg"
                                            }
                                            className="w-4 h-4 mt-0.5 mr-1"
                                            alt=""
                                        />{" "}
                                        a digit
                                    </small>
                                    <small
                                        className={`${
                                            !conditionsPass.specialCharacter
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } flex items-center`}
                                    >
                                        <img
                                            src={
                                                !conditionsPass.specialCharacter
                                                    ? "/img/check.svg"
                                                    : "/img/cross.svg"
                                            }
                                            className="w-4 h-4 mt-0.5 mr-1"
                                            alt=""
                                        />{" "}
                                        a special character
                                    </small>
                                </div>
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                    onChange={handleInfos}
                                />
                                {errorMessage.confirmPassword && (
                                    <small className="text-red-600 block mr-0.5 absolute right-0">
                                        {errorMessage.confirmPassword}
                                    </small>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
                                >
                                    Create an account
                                </button>
                                {errorMessage.global && (
                                    <small className="text-red-600 block ml-0.5">
                                        {errorMessage.global}
                                    </small>
                                )}
                            </div>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    to={"/login"}
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
