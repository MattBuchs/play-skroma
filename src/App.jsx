import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Checkers from "./pages/Checkers";

function App() {
    const [display, setDisplay] = useState(true);

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Nav display={display} setDisplay={setDisplay} />
                <main className="bg-gray-200 grow flex">
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
            </div>
        </BrowserRouter>
    );
}

export default App;
