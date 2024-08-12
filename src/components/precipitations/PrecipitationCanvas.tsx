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
  cloudImage,
  isSliding,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const animationFrameRef = useRef<number | null>(null);

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

    let raindrops: Raindrop[] = [];

    if (relativeHumidity[0] >= 90) {
      let prevRH = relativeHumidity[0];
      let prevDrops = getNumDrops(prevRH);

      const numDrops = relativeHumidity.map((rh, index) => {
        if (index === 0) {
          return prevDrops;
        } else {
          prevRH = relativeHumidity[index - 1];
          if (rh > prevRH) {
            prevDrops = Math.floor(prevDrops);
          } else if (rh < 20) {
            return (prevDrops = Math.floor(prevDrops * 0.2));
          }
          if (rh <= 60) {
            prevDrops = Math.floor(prevDrops * 0.5);
          } else if (rh <= 90) {
            prevDrops = Math.floor(prevDrops * 0.7);
          }
          return prevDrops;
        }
      });

      raindrops = numDrops
        .map((num, layer) => {
          return generateRaindrops(
            num,
            precipImages[determinePrecipType(temp[layer], layer,temp[0],temp[1])],
            layer,
            canvas.width,
            canvas.height
          );
        })
        .flat();

      setRaindrops(raindrops);
    }

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const layerPositions = [0.25, 0.5, 0.75, 1];

      for (let drop of raindrops) {
        drawRaindrop(ctx, drop, drop.image);
        updateRaindrop(drop, canvas.height, layerPositions);
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

  const drawRaindrop = (
    ctx: CanvasRenderingContext2D,
    drop: Raindrop,
    img: HTMLImageElement
  ) => {
    const size = img === precipImages["snow"] ? 15 : 25;
    ctx.drawImage(img, drop.x, drop.y, size, size);
  };

  const updateRaindrop = (
    drop: Raindrop,
    height: number,
    layers: number[]
  ) => {
    drop.y += drop.speed;
    const scales = [0.27, 0.5, 0.75, 1];
    if (drop.layer === 0 && drop.y > height * layers[1]) {
      drop.y = height * scales[drop.layer];
    } else if (drop.layer === 1 && drop.y > height * layers[2]) {
      drop.y = height * scales[drop.layer];
    } else if (drop.y > height) {
      drop.y = height * scales[drop.layer];
      drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="absolute"
    ></canvas>
  );
};

export default RaindropCanvas;
// import React, { useEffect, useRef } from "react";
// import { Raindrop, Images } from "./interfaces";
// import { generateRaindrops, getNumDrops, determinePrecipType } from "./helpers";

// interface RaindropCanvasProps {
//   temp: number[];
//   relativeHumidity: number[];
//   precipImages: { [key: string]: HTMLImageElement };
//   cloudImage: Images;
//   isSliding: boolean;
// }

// const RaindropCanvas: React.FC<RaindropCanvasProps> = ({
//   temp,
//   relativeHumidity,
//   precipImages,
//   cloudImage,
//   isSliding,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     if (isSliding) {
//       // Clear the canvas when sliding is in progress
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       return;
//     }

//     let raindrops: Raindrop[] = [];

//     if (relativeHumidity[0] >= 90) {
//       let prevRH = relativeHumidity[0];
//       let prevDrops = getNumDrops(prevRH);

//       const numDrops = relativeHumidity.map((rh, index) => {
//         if (index === 0) {
//           return prevDrops;
//         } else {
//           prevRH = relativeHumidity[index - 1];
//           if (rh > prevRH) {
//             prevDrops = Math.floor(prevDrops);
//           } else if (rh < 20) {
//             return (prevDrops = Math.floor(prevDrops * 0.2));
//           }
//           if (rh <= 60) {
//             prevDrops = Math.floor(prevDrops * 0.5);
//           } else if (rh <= 90) {
//             prevDrops = Math.floor(prevDrops * 0.7);
//           }
//           return prevDrops;
//         }
//       });

//       raindrops = numDrops
//         .map((num, layer) => {
//           if (layer === 0) {
//             return generateRaindrops(
//               num,
//               precipImages[determinePrecipType(temp[layer], layer)],
//               layer,
//               canvas.width,
//               canvas.height
//             );
//           } else {
//             return generateRaindrops(
//               num,
//               precipImages[determinePrecipType(temp[layer], layer, temp[0])],
//               layer,
//               canvas.width,
//               canvas.height
//             );
//           }
//         })
//         .flat();
//     }

//     const animate = () => {
//       if (!canvasRef.current) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const layerPositions = [0.25, 0.5, 0.75, 1];

//       for (let drop of raindrops) {
//         drawRaindrop(ctx, drop, drop.image);
//         updateRaindrop(drop, canvas.height, layerPositions);
//       }

//       requestAnimationFrame(animate);
//     };

//     animate();
//   }, [relativeHumidity, temp, precipImages, isSliding]);

//   const drawRaindrop = (
//     ctx: CanvasRenderingContext2D,
//     drop: Raindrop,
//     img: HTMLImageElement
//   ) => {
//     if (img === precipImages["snow"]) {
//       ctx.drawImage(img, drop.x, drop.y, 15, 15);
//     } else {
//       ctx.drawImage(img, drop.x, drop.y, 25, 25);
//     }
//   };

//   const updateRaindrop = (
//     drop: Raindrop,
//     height: number,
//     layers: number[]
//   ) => {
//     drop.y += drop.speed;
//     const scales = [0.27, 0.5, 0.75, 1];
//     if (drop.layer === 0 && drop.y > height * layers[1]) {
//       drop.y = height * scales[drop.layer];
//     } else if (drop.layer === 1 && drop.y > height * layers[2]) {
//       drop.y = height * scales[drop.layer];
//     } else if (drop.y > height) {
//       drop.y = height * scales[drop.layer];
//       drop.x = Math.random() * (canvasRef.current?.width || window.innerWidth);
//     }
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       width={window.innerWidth}
//       height={window.innerHeight}
//       className="absolute"
//     ></canvas>
//   );
// };

// export default RaindropCanvas;
