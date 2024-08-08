import React, { useEffect, useState, useRef } from "react";

// Define interfaces for image and raindrop objects
interface Images {
  src: string;
  name: string;
}

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  image: HTMLImageElement;
  layer: number;
}

interface Precips {
  src: string;
  name: string;
  enable: boolean;
}

// Define background images for different weather conditions
const backgroundImg: Images[] = [
  { src: "/img/clouds/sunny.png", name: "sunny" },
  { src: "/img/clouds/lightCloud.png", name: "light cloud" },
  { src: "/img/clouds/darkCloud.png", name: "dark cloud" },
];

// Define precipitation images
const PrecipImages: Precips[] = [
  { src: "/img/precipitation/raindrop.png", name: "raindrop", enable: false },
  { src: "/img/precipitation/sleet.png", name: "sleet", enable: false },
  { src: "/img/precipitation/snow-grains.png", name: "snow-grains", enable: false },
  { src: "/img/precipitation/supercooled-droplet.png", name: "supercooled-Droplets", enable: false },
  { src: "/img/precipitation/snowflake_ice-crystal.png", name: "snow", enable: false },
];

// Helper function to convert Fahrenheit to Celsius
const toCelsius = (tempF: number): number => ((tempF - 32) * 5) / 9;

// Helper function to calculate relative humidity based on temperature and dew point
const calculateRelativeHumidity = (tempF: number, dewPointF: number): number => {
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
  const [precipImages, setPrecipImages] = useState<{ [key: string]: HTMLImageElement }>({}); // State for precipitation images

  // Calculate relative humidity for each temperature and dew point pair
  const relativeHumidity = temp.map((t, index) =>
    calculateRelativeHumidity(t, dewPoint[index])
  );

  // Determine the cloud image based on the relative humidity of the first layer
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

  // Load all precipitation images asynchronously
  useEffect(() => {
    const loadImages = async () => {
      const images: { [key: string]: HTMLImageElement } = {};
      for (const precip of PrecipImages) {
        const img = new Image();
        img.src = precip.src;
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });
        images[precip.name] = img;
      }
      setPrecipImages(images);
    };
    loadImages();
  }, []);

  // Handle the animation of precipitation based on relative humidity
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    let raindrops: Raindrop[] = [];
    
    if (relativeHumidity[0] >= 90) {
      let prevRH = relativeHumidity[0];
      let prevDrops = getNumDrops(prevRH); // Initial number of drops for the first layer
      
      const numDrops = relativeHumidity.map((rh, index) => {
        if (index === 0) {
          return prevDrops;
        } else {
          // For subsequent layers
          prevRH = relativeHumidity[index - 1];
          if (rh >  prevRH){
            prevDrops = Math.floor(prevDrops);
          } else if (rh < 20) {
            return prevDrops =  Math.floor(prevDrops * 0.1);
          }
          if (rh <= 60) {
            prevDrops = Math.floor(prevDrops * 0.5);
          }
          else if (rh <= 90) {
            prevDrops = Math.floor(prevDrops * 0.7);
          }
          console.log(prevDrops)
          return prevDrops;
        } 
        //   return 0;
        // }
      });
  
      // Generate raindrops for each layer
      raindrops = numDrops
        .map((num, layer) =>
          generateRaindrops(
            num,
            precipImages[determinePrecipType(temp[layer])],
            layer
          )
        )
        .flat();
    }
    // Animation function to update and draw raindrops
    // Animation function to update and draw raindrops
const animate = () => {
  if (!canvasRef.current) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define layer positions
  const layerPositions = [0.25, 0.5, 0.75, 1];

  // Draw and update each raindrop
  for (let drop of raindrops) {
    drawRaindrop(ctx, drop, drop.image);
    updateRaindrop(drop, canvas.height, layerPositions);
  }

  requestAnimationFrame(animate); // Continue the animation loop
};

    animate(); // Start animation
  }, [relativeHumidity, temp, precipImages]);

  // Determine the number of raindrops based on humidity
  const getNumDrops = (humidity: number): number => {
    if (humidity >= 100) return 250; // Heavy rain
    if (humidity >= 95) return 50; // Moderate rain
    if (humidity >= 90) return 20; // Light rain
    return 0; // No rain
  };

  // Determine the type of precipitation based on temperature
  const determinePrecipType = (temperature: number): string => {
    if (temperature <= 32) return "snow"; // Snow for temperatures <= 32°F
    if (temperature <= 40) return "sleet"; // Sleet for temperatures <= 40°F
    return "raindrop"; // Rain for temperatures > 40°F
  };

  // Generate raindrop objects with random positions and speeds
  const generateRaindrops = (
    numOfDrops: number,
    image: HTMLImageElement,
    layer: number
  ): Raindrop[] => {
    const drops: Raindrop[] = [];
    const width = canvasRef.current?.width || window.innerWidth;
    const height = canvasRef.current?.height || window.innerHeight;
    const scales = [0.25, 0.5, 0.75, 1];

    for (let i = 0; i < numOfDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: height * scales[layer], // Initialize y within the layer's range
        speed: Math.random() * 4 + 2, // Random speed
        length: 0,
        image,
        layer,
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
  // Update the position of a raindrop and remove it if it reaches beyond the layer bounds
// const updateRaindrop = (drop: Raindrop, height: number, layers: number[]) => {
//   drop.y += drop.speed;
  
//   // Check if raindrop should be removed based on its layer and position
  
//   if (drop.layer === 0 && drop.y > height * layers[1]) {
//     drop.y = -1; // Move raindrop off the canvas
//   } else if (drop.y > height) {
//     // Reset y position if it goes beyond the canvas height
//     drop.y = height * layers[drop.layer]; // Set to the layer's starting position
//     drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
//   }
// };

const updateRaindrop = (drop: Raindrop, height: number, layers: number[]) => {
  drop.y += drop.speed;
  const scales = [0.25, 0.5, 0.75, 1];
  if (drop.layer === 0 && drop.y > height * layers[1]) {
    drop.y = height * scales[drop.layer]; 
  } else if (drop.y > height) {
    drop.y = height * scales[drop.layer]; // Reset y to the starting position for the current layer
    drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
  }
};

  return (
    <div className="w-100 h-screen relative border border-solid border-black overflow-hidden">
      {/* Display the background cloud image */}
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
