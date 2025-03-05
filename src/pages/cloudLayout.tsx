import { Link } from "react-router-dom";
import CloudDiagram from "../components/cloudGame/cloudDiagram";
import style from "./styles.module.css";
const CloudLayout = () => {
  return (
    <div className={style.backgroundContainer}>
     
        <h1 className="font-serif font-bold">Types of Cloud</h1>
        <Link to="/cloudGame">
          <button className="m-2">Play Cloud Identification Game</button>
        </Link>
 <div className={style.diagramContainer}>
        <div className="w-full h-full">
          <CloudDiagram />
        </div>
      </div>
    </div>
  );
};

export default CloudLayout;
