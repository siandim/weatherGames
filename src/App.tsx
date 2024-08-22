
import { Route, Routes } from "react-router-dom";
import Page1 from "./pages/Page1";
import NavBar from "./components/NavBar";
import Page3 from "./pages/Page3";
// import Precipitation from "./pages/Precipitation";
import MemoryGamePage from "./pages/MemoryGame";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Page1 />} />
        
        <Route path="/page3" element={<Page3 />} />
        <Route path="/memoryGame" element={<MemoryGamePage />} />
      </Routes>
    </>
  );
}

export default App;
