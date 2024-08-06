import "../components/precipitations/precipitation.css";
import Precip from "../components/precipitations/Precip";
const Precipitation = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Precipitation Simulation</h1>
      <Precip />
    </div>
  );
};

export default Precipitation;
