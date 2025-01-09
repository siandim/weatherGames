import MemoryGame from "../components/memoryGames/memoryGame";
import styles from "../components/memoryGames/memoryGame.module.css";
const MemoryGamePage = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <h1 className={styles.texts}>Match the Weather Instruments</h1>
      </div>
      <div>
        <MemoryGame />
      </div>
    </div>
  );
};

export default MemoryGamePage;
