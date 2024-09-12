import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import CheckersGame from "./pages/Checkers/CheckersGame";
import CheckersHome from "./pages/Checkers/CheckersHome";
import MorpionHome from "./pages/Morpion/MorpionHome";
import MorpionGame from "./pages/Morpion/MorpionGame";
import MorpionOnline from "./pages/Morpion/MorpionOnline";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Auth/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./features/user";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Nav />
            <main className="bg-gray-200">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Others */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />

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
                    <Route
                        path="/morpion/:gameID"
                        element={<MorpionOnline />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
