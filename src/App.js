import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MatchDetail from "./pages/MatchDetail";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/players" element={<Players />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
