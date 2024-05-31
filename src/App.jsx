import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CheckersGame from "./pages/Checkers/CheckersGame";
import CheckersHome from "./pages/Checkers/CheckersHome";
import NotFound from "./pages/NotFound";

function App() {
    const [display, setDisplay] = useState(true);

    return (
        <BrowserRouter>
            <Nav display={display} setDisplay={setDisplay} />
            <main className="grow">
                <Routes>
                    <Route
                        path="/"
                        element={<Home setDisplay={setDisplay} />}
                    />
                    <Route
                        path="/checkers-home"
                        element={<CheckersHome setDisplay={setDisplay} />}
                    />
                    <Route
                        path="/checkers"
                        element={<CheckersGame setDisplay={setDisplay} />}
                    />
                    <Route
                        path="/checkers/:gameID"
                        element={<CheckersGame setDisplay={setDisplay} />}
                    />
                    <Route
                        path="*"
                        element={<NotFound setDisplay={setDisplay} />}
                    />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
