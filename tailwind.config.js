/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            xxs: "320px",
            xs: "430px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
        },
    },
    plugins: [],
};
