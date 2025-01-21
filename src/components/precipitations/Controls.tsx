// LayerControls.tsx
import React from "react";
import styles from "./precipitation.module.css";
interface LayerControlsProps {
  temp: number[];
  dewPoint: number[];
  relativeHumidity: number[];
  handleTempChange: (index: number, value: number) => void;
  handleDewPointChange: (index: number, value: number) => void;
  handleSlidingEnd: () => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({
  temp,
  dewPoint,
  relativeHumidity,
  handleTempChange,
  handleDewPointChange,
  handleSlidingEnd,
}) => (
  <div>
    <div>
      {temp.map((_t, index) => (
        <div key={index} className={styles.sliders}>
          <br />
          <div>
            <label className={styles.labels}>Temperature:</label>

            <input
              type="range"
              min="20"
              max="75"
              value={temp[index]}
              onClick={handleSlidingEnd}
              onTouchStart={handleSlidingEnd}  
              onChange={(e) => handleTempChange(index, Number(e.target.value))}
              onMouseUp={handleSlidingEnd}
              onTouchEnd={handleSlidingEnd}
              style={{
                background: `linear-gradient(to right, 
rgb(86, 104, 165) 0%, /* Left side () */
                  rgb(84, 145, 214) ${
                    ((temp[index] - 20) / (75 - 20)) * 100
                  }%, /* Fill percentage */
                  #ddd ${
                    ((temp[index] - 20) / (75 - 20)) * 100
                  }%, /* Right side (Gray) */
                  #ddd 100%)`,
              }}
            />
            <span className={styles.fah}>{temp[index]}°F</span>
          </div>
          <div>
            <label className={styles.labels}>Dew Point:</label>
            <input
              type="range"
              min="20"
              max="75"
              value={dewPoint[index]}
              onTouchStart={handleSlidingEnd}
              onClick={handleSlidingEnd}
              onChange={(e) =>
                handleDewPointChange(index, Number(e.target.value))
              }
              onMouseUp={handleSlidingEnd}
              onTouchEnd={handleSlidingEnd}
              style={{
                background: `linear-gradient(to right, 
rgb(99, 58, 20) 0%, /* Left side  */
                  rgb(85, 59, 11) ${
                  ((dewPoint[index] - 20) / (75 - 20)) * 100
                }%, /* Fill percentage */
                  #ddd ${
                    ((dewPoint[index] - 20) / (75 - 20)) * 100
                  }%, /* Right side (Gray) */
                  #ddd 100%)`,
              }}
            />
            <span className={styles.fah}>{dewPoint[index]}°F</span>
          </div>
          <div>
            <label>Relative Humidity:</label>
            <span>{relativeHumidity[index]}%</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
