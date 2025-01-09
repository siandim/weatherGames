// src/App.tsx
import React from "react";
import PrecipWithDetails from "../components/precipitations/PrecipWithDetails";

const PrecipitationPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <PrecipWithDetails />
      </div>
      {/* <div>
        <h2>Precipitation Simulation</h2>
        <p>We are simulating rain, cold droplets, sleet, or snow falling from the sky, depending on the temperature, dew point, and relative humidity.</p>
        
        <h3>What is Precipitation?</h3>
        <p>Precipitation is all types of water that falls from the sky. This includes:</p>
        <ol>
          <li>Rain</li>
          <li>Snow</li>
          <li>Sleet</li>
          <li>Hail</li>
        </ol>
      </div> */}
    </div>
  );
};

export default PrecipitationPage;
