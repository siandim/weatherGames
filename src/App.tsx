
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PrecipitationPage from "./pages/Precip";
import MemoryGamePage from "./pages/MemoryGame";
// import Precipitation from "./pages/Precipitation";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precip" element={<PrecipitationPage />} />
        <Route path="/memoryGame" element={<MemoryGamePage />} />
      </Routes>
    </>
  );
}

export default App;
