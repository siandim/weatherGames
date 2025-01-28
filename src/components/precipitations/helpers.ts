import { Raindrop } from "./interfaces";

export const toCelsius = (tempF: number): number => ((tempF - 32) * 5) / 9;

// Helper function to calculate relative humidity based on temperature and dew point
export const calculateRelativeHumidity = (tempF: number, dewPointF: number): number => {
  const tempC = toCelsius(tempF);
  const dewPointC = toCelsius(dewPointF);
  const e_d = 6.112 * Math.exp((17.67 * dewPointC) / (dewPointC + 243.5));
  const e_s = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
  return Math.round(100 * (e_d / e_s));
};
//okay
export  const generateRaindrops = (
    numOfDrops: number,
    image: HTMLImageElement,
    layer: number,
    canvasWidth: number,
    canvasHeight:number,
  ): Raindrop[] => {
    const drops: Raindrop[] = [];
    const scales = [0.10, 0.5, 0.75, 1];

    for (let i = 0; i < numOfDrops; i++) {
      drops.push({
        x: Math.random() * canvasWidth,
        y: canvasHeight * scales[layer], // Initialize y within the layer's range
        speed: Math.random() * 4 + 2, // Random speed
        length: 0,
        image,
        layer,
        canChangeType: false
      });

    }
    return drops;
  };

  export const getNumDrops = (humidity: number): number => {
    if (humidity >= 100) return 250; // Heavy rain
    if (humidity >= 95) return 50; // Moderate rain
    if (humidity >= 90) return 20; // Light rain
    return 0; // No rain
  };

  // Determine the type of precipitation based on temperature
  export const determinePrecipType = (currTemp: number,layer:number,firstTemp:number, secondTemp:number): string => {
    if (layer === 0){
      if (currTemp <= 32) return "snow"; // Snow for currTemps <= 32°F
      if (currTemp <= 40) return "supercooled-Droplets";
      return "raindrop";
    } else if (layer ===1 ) {
      if (firstTemp > 32 && currTemp <= 32) return "snow-grains"; // Snow for currTemps <= 32°F
      if (currTemp <= 32) return "snow"; // Snow for currTemps <= 32°F
      if (currTemp <= 40) return "supercooled-Droplets";
    } else {
      if ((firstTemp > 32 || secondTemp > 32) && currTemp <= 32 ) {
        return "snow-grains";    
      } else if(firstTemp < 32 && secondTemp <32 && currTemp <= 32 ) {
        return "snow";
      } else if (currTemp <= 40){
        return "supercooled-Droplets";
      } else {
        return "raindrop"
      }
    }
     // Sleet for temperatures <= 40°F
    return "raindrop"; // Rain for temperatures > 40°F
  };