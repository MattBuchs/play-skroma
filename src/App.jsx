import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CheckersGame from "./pages/Checkers/CheckersGame";
import CheckersHome from "./pages/Checkers/CheckersHome";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <main className="bg-gray-200 py-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checkers-home" element={<CheckersHome />} />
                    <Route path="/checkers" element={<CheckersGame />} />
                    <Route
                        path="/checkers/:gameID"
                        element={<CheckersGame />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
