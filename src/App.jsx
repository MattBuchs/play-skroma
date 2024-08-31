import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import CheckersGame from "./pages/Checkers/CheckersGame";
import CheckersHome from "./pages/Checkers/CheckersHome";
import MorpionHome from "./pages/Morpion/MorpionHome";
import MorpionGame from "./pages/Morpion/MorpionGame";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Auth/Signup";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <main className="bg-gray-200">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

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
