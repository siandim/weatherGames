// LayerControls.tsx
import React from "react";

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
  <>
    {temp.map((_t, index) => (
      <div key={index} className="layer">
        <h2>Layer {index + 1}</h2>
        <div>
          <label>Temperature:</label>
          <input
            type="range"
            min="20"
            max="100"
            value={temp[index]}
            onChange={(e) => handleTempChange(index, Number(e.target.value))}
            onMouseUp={handleSlidingEnd}
            onTouchEnd={handleSlidingEnd}
          />
          <span className="fah">{temp[index]}°F</span>
        </div>
        <div>
          <label>Dew Point:</label>
          <input
            type="range"
            min="20"
            max="100"
            value={dewPoint[index]}
            onChange={(e) => handleDewPointChange(index, Number(e.target.value))}
            onMouseUp={handleSlidingEnd}
            onTouchEnd={handleSlidingEnd}
          />
          <span className="fah">{dewPoint[index]}°F</span>
        </div>
        <div>
          <label>Relative Humidity:</label>
          <span>{relativeHumidity[index]}%</span>
        </div>
      </div>
    ))}
  </>
);