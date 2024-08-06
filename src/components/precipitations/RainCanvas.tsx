import React, { useEffect, useState, useRef } from "react";

// Define the interfaces for the image objects
interface Images {
  src: string;
  name: string;
}

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  src: string;
}

interface Precips {
  src: string;
  name: string;
  enable: boolean;
}

// Define the background images
const backgroundImg: Images[] = [
  { src: "/img/clouds/sunny.png", name: "sunny" },
  { src: "/img/clouds/lightCloud.png", name: "light cloud" },
  { src: "/img/clouds/darkCloud.png", name: "dark cloud" },
];

// Define the precipitation images
const PrecipImages: Precips[] = [
  { src: "/img/precipitation/raindrop.png", name: "raindrop", enable: false },
  { src: "/img/precipitation/sleet.png", name: "sleet", enable: false },
  {
    src: "/img/precipitation/snow-grains.png",
    name: "snow-grains",
    enable: false,
  },
  {
    src: "/img/precipitation/supercooled-droplet.png",
    name: "supercooled-Droplets",
    enable: false,
  },
  {
    src: "/img/precipitation/snowflake_ice-crystal.png",
    name: "snow",
    enable: false,
  },
];

// Helper function to convert Fahrenheit to Celsius
const toCelsius = (tempF: number): number => ((tempF - 32) * 5) / 9;

// Helper function to calculate relative humidity
const calculateRelativeHumidity = (
  tempF: number,
  dewPointF: number
): number => {
  const tempC = toCelsius(tempF);
  const dewPointC = toCelsius(dewPointF);
  const e_d = 6.112 * Math.exp((17.67 * dewPointC) / (dewPointC + 243.5));
  const e_s = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
  return Math.round(100 * (e_d / e_s));
};

// Main React functional component
const RainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas element
  const [temp, setTemp] = useState<number[]>([70, 70, 70, 70]); // State for temperatures
  const [dewPoint, setDewPoint] = useState<number[]>([50, 50, 50, 50]); // State for dew points

  // Calculate relative humidity for each temperature and dew point pair

  const relativeHumidity = temp.map((t, index) =>
    calculateRelativeHumidity(t, dewPoint[index])
  );

  // Determine the cloud image based on the relative humidity
  let cloudImage = backgroundImg[0];
  if (relativeHumidity[0] >= 80) {
    cloudImage = backgroundImg[2];
  } else if (relativeHumidity[0] >= 50) {
    cloudImage = backgroundImg[1];
  }

  // Handle changes to the temperature inputs
  const handleTempChange = (index: number, value: number) => {
    const newTemp = [...temp];
    newTemp[index] = value;
    setTemp(newTemp);
  };

  // Handle changes to the dew point inputs
  const handleDewPointChange = (index: number, value: number) => {
    const newDewPoint = [...dewPoint];
    newDewPoint[index] = Math.min(value, temp[index]);
    setDewPoint(newDewPoint);
  };

  // Ensure dew points do not exceed corresponding temperatures
  useEffect(() => {
    const updatedDewPoints = dewPoint.map((dp, index) =>
      Math.min(dp, temp[index])
    );
    setDewPoint(updatedDewPoints);
  }, [temp]);

  // Effect to handle the animation of precipitation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine the type of precipitation based on the temperature
    const precipType = determinePrecipType(temp[0]);
    const precipImage =
      PrecipImages.find((p) => p.name === precipType)?.src || "";

    // Calculate the number of raindrops based on the relative humidity
    const numDrops = getNumDrops(relativeHumidity[0]);

    // Generate raindrops with random positions and speeds
    const raindrops = generateRaindrops(numDrops, precipImage);

    // Load the precipitation image
    const img = new Image();
    img.src = precipImage;

    // Animation function to update and draw raindrops
    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let drop of raindrops) {
        drawRaindrop(ctx, drop, img);
        updateRaindrop(drop, canvas.height);
      }

      requestAnimationFrame(animate);
    };

    img.onload = animate; // Start animation after the image is loaded
  }, [relativeHumidity, temp]);

  // Determine the number of raindrops based on humidity
  const getNumDrops = (humidity: number): number => {
    if (humidity >= 100) return 250;
    if (humidity >= 95) return 50;
    if (humidity >= 90) return 20;
    return 0;
  };

  // Determine the type of precipitation based on temperature
  const determinePrecipType = (temperature: number): string => {
    if (temperature <= 32) return "snow";
    if (temperature <= 40) return "sleet";
    return "raindrop";
  };

  // Generate raindrop objects with random positions and speeds
  const generateRaindrops = (num: number, src: string): Raindrop[] => {
    const drops: Raindrop[] = [];
    const width = canvasRef.current?.width || window.innerWidth;
    const height = canvasRef.current?.height || window.innerHeight;

    for (let i = 0; i < num; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 4 + 2,
        length: 0,
        src,
      });
    }
    return drops;
  };

  // Draw a raindrop on the canvas
  const drawRaindrop = (
    ctx: CanvasRenderingContext2D,
    drop: Raindrop,
    img: HTMLImageElement
  ) => {
    ctx.drawImage(img, drop.x, drop.y, 25, 25); // Adjust size as needed
  };

  // Update the position of a raindrop
  const updateRaindrop = (drop: Raindrop, height: number) => {
    drop.y += drop.speed;
    if (drop.y > height) {
      drop.y = height * 0.25;
      drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
    }
  };

  return (
    <div className="w-100 h-screen relative border border-solid border-black overflow-hidden">
      {/* Background cloud image */}
      <img
        src={cloudImage.src}
        alt={cloudImage.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Canvas for drawing raindrops */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute"
      ></canvas>
      <div className="inputs relative p-4">
        <div className="pt-14">
          {/* Inputs for adjusting temperature and dew point */}
          {temp.map((t, index) => (
            <div key={index} className="layer">
              <h2>Layer {index + 1}</h2>
              <div>
                <label>Temperature:</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={temp[index]}
                  onChange={(e) =>
                    handleTempChange(index, Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    handleDewPointChange(index, Number(e.target.value))
                  }
                />
                <span className="fah">{dewPoint[index]}°F</span>
              </div>
              <div>
                <label>Relative Humidity:</label>
                <span>{relativeHumidity[index]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RainCanvas;
