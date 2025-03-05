import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PrecipitationPage from "./pages/Precip";
import MemoryGamePage from "./pages/MemoryGame";
import WaterCyclePage from "./pages/WaterCycle.tsx";
import CloudGame from "./pages/CloudGame.tsx";
import CloudLayout from "./pages/cloudLayout.tsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precip" element={<PrecipitationPage />} />
        <Route path="/memoryGame" element={<MemoryGamePage />} />
        <Route path="/waterCycle" element={<WaterCyclePage />}/>
        <Route path="/cloudDiagram" element={<CloudLayout/>}/>
        <Route path="/cloudGame" element={<CloudGame/>}/>
      </Routes>
    </>
  );
}

export default App;
