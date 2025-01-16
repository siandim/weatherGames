import React, { useEffect, useRef, useState } from "react";
import { Raindrop, Images } from "./interfaces";
import { generateRaindrops, getNumDrops, determinePrecipType } from "./helpers";

interface RaindropCanvasProps {
  temp: number[];
  relativeHumidity: number[];
  precipImages: { [key: string]: HTMLImageElement };
  cloudImage: Images;
  isSliding: boolean;
}

const RaindropCanvas: React.FC<RaindropCanvasProps> = ({
  temp,
  relativeHumidity,
  precipImages,
  isSliding,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [showPuddle, setShowPuddle] = useState<boolean>(false); // Track puddle visibility

  // Define a humidity threshold for precipitation
  const humidityThreshold = 60; // Adjust this value as necessary

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isSliding) {
      // Clear the canvas and stop animation when sliding is in progress
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Check if the relative humidity for layer 1 is above the threshold
    if (raindrops.length === 0 && relativeHumidity[0] >= humidityThreshold) {
      // Generate initial raindrops from layer 1
      const numDrops = getNumDrops(relativeHumidity[0]); // Based on layer 1's humidity

      const initialRaindrops = generateRaindrops(
        numDrops,
        precipImages[determinePrecipType(temp[0], 0, temp[0], temp[1])],
        0, // Start all drops from layer 1
        canvas.width,
        canvas.height
      ).map((drop) => {
        let canChangeType;

        if (temp[0] > 32 && drop.layer === 1) {
          // If it's above freezing (32°F) in the lowest layer (layer 1), keep as rain
          canChangeType = false; // 0% chance of changing type (stays as rain)
        } else if (temp[0] < 32 && drop.layer > 1 && drop.layer <= 3) {
          // If it's below freezing in mid layers (layer 2 and 3), chance to change into sleet or snow
          canChangeType = true; // 100% chance of changing into snow/sleet
        } else if (temp[0] < 20 && drop.layer > 3) {
          // If it's very cold (below 20°F) in higher layers (layer 4+), strong chance of turning into snow
          canChangeType = true; // Strong chance of turning into snow or ice
        } else if (temp[0] < 40 && temp[1] < 32 && drop.layer > 1) {
          // If temperature in the first layer is below 40°F and second layer is below freezing with high humidity
          canChangeType = Math.random() < 0.9; // 90% chance of changing type (likely to freeze)
        } else if (temp[0] < 32 && temp[1] > 50) {
          canChangeType = Math.random() < 1;
        } else {
          //   // Default condition: 70% chance to change type based on random factors (e.g., wind)
          canChangeType = Math.random() < 0.8;
        } // 70% chance the raindrop can change type
        return {
          ...drop,
          canChangeType,
        };
      });
      setRaindrops(initialRaindrops);
      //
      // setRainDuration((prev) => prev + 1);
      // setShowPuddle(true); // Show puddle after enough rain
    } else {
      // If humidity is not sufficient, set raindrops to empty
      setRaindrops([]);
      setShowPuddle(false);
    }
    if (
      relativeHumidity[0] > 98 &&
      relativeHumidity[1] > 60 &&
      relativeHumidity[2] > 60
    ) {
      console.log(relativeHumidity[3]);
      setShowPuddle(true);
    } else {
      setShowPuddle(false);
    }

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const layerPositions = [0.1, 0.35, 0.55, 0.7]; // Define layer positions as percentages of canvas height

      for (let drop of raindrops) {
        // Determine the current layer based on drop.y position
        const currentLayer = getCurrentLayer(
          drop.y,
          canvas.height,
          layerPositions
        );

        // Only change the precipitation type if canChangeType is true
        if (drop.canChangeType) {
          const newPrecipType = determinePrecipType(
            temp[currentLayer],
            currentLayer,
            temp[0],
            temp[1]
          );
          drop.image = precipImages[newPrecipType];
        }

        // Draw the drop with the (possibly updated) image
        drawRaindrop(ctx, drop, drop.image);

        // Move the drop
        updateRaindrop(drop, canvas.height);
      }
      if (showPuddle) {
        // Choose the correct puddle image based on precipitation type
        const type =
          temp[0] < 32 && temp[2] < 32 && temp[3] < 32
            ? "snow-puddle" // New snow puddle image
            : "puddle"; // Regular rain puddle
        const numPuddles = relativeHumidity[2] > 60 ? 3 : 2;
        console.log(type);
        drawPuddle(
          ctx,
          precipImages[type],
          canvas.width,
          canvas.height,
          numPuddles,
          type
        ); // Pass numPuddles to control the number of puddles
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Clean up animation frame on component unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [relativeHumidity, temp, precipImages, isSliding]);

  // Function to determine the current layer based on y-position
  const getCurrentLayer = (y: number, height: number, layers: number[]) => {
    if (y < height * layers[1]) {
      return 0; // Layer 1
    } else if (y < height * layers[2]) {
      return 1; // Layer 2
    } else if (y < height * layers[3]) {
      return 2; // Layer 3
    } else {
      return 3; // Layer 4
    }
  };

  const updateRaindrop = (drop: Raindrop, height: number) => {
    drop.y += drop.speed;

    // Get the current layer based on drop's y position
    const currentLayer = getCurrentLayer(
      drop.y,
      height,
      [0.1, 0.35, 0.55, 0.7]
    );
    const dissapear = height + 1;
    // Define probabilities for disappearing in layers 2 and 3
    if (currentLayer === 1) {
      // && relativeHumidity[1] < 90 && Math.random() < 0.05
      // 20% chance to disappear in layer 2
      switch (true) {
        case relativeHumidity[1] < 30:
          if (Math.random() < 0.15) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[1] < 40:
          if (Math.random() < 0.1) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[1] < 60:
          if (Math.random() < 0.07) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[1] < 80:
          if (Math.random() < 0.05) {
            drop.y = dissapear;
          }
          break;
        default:
          break;
      }
      // drop.y = height + 1; // Move it out of view
    } else if (
      currentLayer === 2 &&
      relativeHumidity[2] < relativeHumidity[1]
    ) {
      // && relativeHumidity[2] < 90 && Math.random() < 0.05
      // 30% chance to disappear in layer 3

      switch (true) {
        case relativeHumidity[2] < 30:
          if (Math.random() < 0.15) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[2] < 40:
          if (Math.random() < 0.1) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[2] < 60:
          if (Math.random() < 0.07) {
            drop.y = dissapear;
          }
          break;
        case relativeHumidity[2] < 80:
          if (Math.random() < 0.05) {
            drop.y = dissapear;
          }
          break;
        default:
          break;
      }
      //drop.y = height + 1; // Move it out of view
    }

    // Reset drop to the top if it falls out of view
    if (drop.y > height) {
      drop.y = 0.16 * height;
      drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
    }
  };

  const drawRaindrop = (
    ctx: CanvasRenderingContext2D,
    drop: Raindrop,
    img: HTMLImageElement
  ) => {
    const size = img === precipImages["snow"] ? 15 : 25;
    ctx.drawImage(img, drop.x, drop.y, size, size);
  };

  const drawPuddle = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number,
    numPuddles: number,
    type: "snow-puddle" | "puddle"
  ) => {
    let puddleWidth = 500;
    let puddleHeight = 50;
    let margin = 20;
    let puddleY = canvasHeight - puddleHeight - 5;

    if (type == "snow-puddle") {
      puddleWidth = 500;
      puddleHeight = 200;
      margin = 0;
      puddleY = canvasHeight - puddleHeight + 85;
    }
    const puddlePositions = [
      margin,
      (canvasWidth - puddleWidth) / 2,
      canvasWidth - puddleWidth - margin,
    ].slice(0, numPuddles); // Limit puddle positions by numPuddles

    puddlePositions.forEach((puddleX) => {
      ctx.drawImage(img, puddleX, puddleY, puddleWidth, puddleHeight);
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width="1000px"
      height="500px"
      className="absolute"
    ></canvas>
  );
};

export default RaindropCanvas;