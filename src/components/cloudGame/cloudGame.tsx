import CloudCatcherGame from "./cloudCatcher";
import CloudDiagram from "./cloudDiagram";
import styles from "./cloudGame.module.css";
import CloudGame from "./cloudGames";
const CloudLayout = () => {
  return (
    <div>
      <div className={styles.texts}>
        <h1>Types of Cloud</h1>
        <button className="mt-2">Play Cloud Identification Game</button>
      </div>

      <div>
        <CloudDiagram />
        <CloudGame/>
        <CloudCatcherGame/>
      </div>
    </div>
  );
};

export default CloudLayout;
