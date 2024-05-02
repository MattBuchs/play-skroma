import { useEffect } from "react";

export default function Home({ setDisplay }) {
    useEffect(() => {
        setDisplay(true);
    }, [setDisplay]);

    useEffect(() => {
        document.title = "PlaySkroma";
    }, []);

    return (
        <div className="pt-14 h-full w-full flex flex-col items-center">
            <h2 className="text-2xl text-center mt-6">
                Bienvenue sur PlaySkroma !
            </h2>
            <img
                src="/logo.png"
                alt="logo"
                className="w-[250px] h-[250px] sm:w-[450px] sm:h-[450px]"
            />
        </div>
    );
}
