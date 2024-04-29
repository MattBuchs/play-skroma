import { useEffect } from "react";

export default function Home({ setDisplay }) {
    useEffect(() => {
        setDisplay(true);
    }, [setDisplay]);

    return (
        <div className="pt-14 h-full w-full">
            <h2 className="text-2xl text-center mt-10">
                Bienvenue sur PlaySkroma !
            </h2>
        </div>
    );
}
