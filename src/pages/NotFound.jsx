import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center">
            <h2 className="text-4xl font-semibold">Error 404</h2>
            <p className="text-lg mt-1 mb-5">Page not found</p>
            <Link
                to="/"
                className="text-blue-700 hover:underline underline-offset-2"
            >
                Click here to return to the home page
            </Link>
        </section>
    );
}
