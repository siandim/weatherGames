import { Link } from "react-router-dom";
import homestyle from "./home.module.css"
const HomePage = () => {
  return (
    <div>
      <div className={homestyle.home}>
      <h1>Learn More about the Weather</h1>
      </div>
      <div className={homestyle.container}>
        <div className={homestyle.iconContainer}>
        <Link to="/precip">
        <img
          className={homestyle.gameIcon}
          src="/img/PrecipitationGame.png"
          alt="PrecipitationGame"
        />
        <p>Precipitation Simulator</p>
        </Link>
      </div>

      <div className={homestyle.iconContainer}>
        <Link to="/memoryGame">
        <img
          className={homestyle.gameIcon}
          src="/img/memoryGame/cover.png"
          alt="cover"
        />
        <p>Memory Game</p>
        </Link>
      </div>
      </div>
    </div>
  );
};
export default HomePage;
