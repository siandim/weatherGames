import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PrecipitationPage from "./pages/Precip";
import MemoryGamePage from "./pages/MemoryGame";
import WaterCyclePage from "./pages/WaterCycle.tsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precip" element={<PrecipitationPage />} />
        <Route path="/memoryGame" element={<MemoryGamePage />} />
        <Route path="/waterCycle" element={<WaterCyclePage />}/>
      </Routes>
    </>
  );
}

export default App;
