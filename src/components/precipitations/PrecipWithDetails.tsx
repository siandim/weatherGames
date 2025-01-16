// src/App.tsx
import React from "react";
import RainCanvas from "./PrecipCanvas";
import styles from "./precipitation.module.css";
const PrecipWithDetails: React.FC = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1>Make It Precipitate</h1>
        <p>
          Set the air temperature and dew point at four different altitudes to
          see what type of precipitation will reach the ground.
        </p>
        <p>
          See what happens when the temperature and dew point are the same or
          close to each other.
        </p>
      </div>
      <div className={styles.borders}>
        <RainCanvas />
      </div>

      <div className="p-4 text-white">
        <h2 className="font-bold text-xl mb-2">Precipitation Simulation</h2>
        <p className="mb-4">
          We are simulating rain, cold droplets, sleet, or snow falling from the
          sky, depending on the temperature, dew point, and relative humidity.
        </p>

        <h3 className="font-bold text-lg mb-2">What is Precipitation?</h3>
        <p className="mb-2">
          Precipitation is all types of water that falls from the sky. This
          includes:
        </p>

        <ul className="list-disc ml-6">
          <li>Rain: Water droplets falling</li>
          <li>Snow: When the water freezes and falls as tiny ice crystals. </li>
          <li>Sleet: A mix of rain and snow.</li>
        </ul>
        <h3 className="font-bold text-lg mb-2">What is Dew Point?</h3>
        <p>
          The dew point is a special temperature that helps us understand when
          water in the air turns into water droplets. The dew point tells us the
          temperature at which air cannot hold any more water.
        </p>
        <h3 className="font-bold text-lg mb-2">
          The Relationship Between Dew Point, Temperature, and Relative Humidity
        </h3>
        <ol className="list-decimal ml-6">
          <li>
            {" "}
            Temperature:
            <p>
              Temperature is how hot or cold the air is. Warm air can hold more
              water vapor, just like a warm sponge can soak up more water. When
              the air is warm, the dew point can be higher because it can hold
              more water.
            </p>
          </li>
          <li>
            Relative Humidity (RH):
            <p>
              Relative humidity tells us how much water vapor is in the air
              compared to how much it could hold at that temperature. It’s like
              a percentage. For example, if the RH is 50%, it means the air is
              half full of water vapor.
            </p>
          </li>
          <li>
            The Dew Point's Role:
            <ul className="list-disc ml-6">
              <li>
                When the temperature is high and RH is also high: The dew point
                is high because there’s a lot of water vapor in the air. If the
                air cools down to the dew point, precipitation is likely because
                it can't hold all that water anymore.
              </li>
              <li>
                When the temperature is low: The air can hold less water. If the
                RH is high, the dew point will be closer to the current
                temperature, meaning it can still lead to condensation and
                possibly precipitation.
              </li>
              <li>
                When RH is low: If the air is dry and the temperature is high,
                the dew point will be low. This means the air has less water
                vapor and won’t reach the dew point easily, so precipitation is
                less likely.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PrecipWithDetails;
