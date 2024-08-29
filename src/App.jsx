import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CheckersGame from "./pages/Checkers/CheckersGame";
import CheckersHome from "./pages/Checkers/CheckersHome";
import MorpionHome from "./pages/Morpion/MorpionHome";
import MorpionGame from "./pages/Morpion/MorpionGame";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <main className="bg-gray-200">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Checkers */}
                    <Route path="/checkers-home" element={<CheckersHome />} />
                    <Route path="/checkers" element={<CheckersGame />} />
                    <Route
                        path="/checkers/:gameID"
                        element={<CheckersGame />}
                    />

                    {/* Morpion */}
                    <Route path="/morpion-home" element={<MorpionHome />} />
                    <Route path="/morpion" element={<MorpionGame />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
