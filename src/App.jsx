import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Checkers from "./pages/Checkers";

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
                        path="/checkers"
                        element={<Checkers setDisplay={setDisplay} />}
                    />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
