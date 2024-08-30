/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            xxxs: "320px",
            xxs: "390px",
            xs: "450px",
            sm: "640px",
            md: "768px",
            lg: "1200px",
        },
    },
    plugins: [],
};
