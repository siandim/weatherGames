import React, { useEffect, useRef, useState } from "react";
import { Raindrop, Images } from "./interfaces";
import { generateRaindrops, getNumDrops, determinePrecipType } from "./helpers";
import styles from "./precipitation.module.css";
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
  const humidityThreshold = 90; 

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const parent = canvas.parentElement; // Get the parent div (.precipAnimation)

      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isSliding) {
      console.log("is sliding ");
      // Clear the canvas and stop animation when sliding is in progress
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log("Animation running:", !!animationFrameRef.current);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }
    console.log("is not sliding ");

    // Check if the relative humidity for layer 1 is above the threshold
    if (raindrops.length === 0 && relativeHumidity[0] >= humidityThreshold) {
      // Generate initial raindrops from layer 1
      const numDrops = getNumDrops(relativeHumidity[0]); // Based on layer 1's humidity
      console.log("Generated raindrops:", raindrops.length);

      const initialRaindrops = generateRaindrops(
        numDrops,
        precipImages[determinePrecipType(temp[0], 0, temp[0], temp[1])],
        0, // Start all drops from layer 1
        canvas.width,
        canvas.height
      ).map((drop) => {
        let canChangeType;

        if (temp[0] < 32 && drop.layer > 1) {
          canChangeType = true; 
         
        } else if (temp[0] < 40 && temp[1] < 32) {
          canChangeType = Math.random() < 0.9; // 90% chance of changing type 
        } else if (temp[0] < 32 && temp[1] > 50) {
          canChangeType = true;
        } else {
         // Default condition: 70% chance to change type based on random factors (e.g., wind)
          canChangeType = Math.random() < 0.7;
        } 
        console.log("cnaChangeType" + canChangeType);
        return {
          ...drop,
          canChangeType,
        };
      });
      setRaindrops(initialRaindrops);
      
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
    console.log("animated " + animate());
    console.log("Current raindrops:", raindrops);
    console.log("Current temp:", temp);
    console.log("Current relativeHumidity:", relativeHumidity);
    // Clean up animation frame on component unmount
    return () => {
      if (animationFrameRef.current) {
        console.log("clean up")
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
            console.log(dissapear)
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
    let puddleY = canvasHeight - puddleHeight;

    if (type == "snow-puddle") {
      puddleWidth = 500;
      puddleHeight = 200;
      margin = 0;
      puddleY = canvasHeight - puddleHeight + 95;
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
    <div className={styles.canva}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default RaindropCanvas;
