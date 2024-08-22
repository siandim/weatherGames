import MemoryGame from "../components/memoryGames/memoryGame";

const MemoryGamePage = () => {
  return (
    <div>
      <div className="header-container">
        <h1 className="texts content-center">Match the Weather Instruments</h1>
      </div>
      <div>
        <MemoryGame />
      </div>
    </div>
  );
};

export default MemoryGamePage;
