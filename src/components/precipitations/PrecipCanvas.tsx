//RainCanvas.tsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Images, Precips } from "./interfaces";
import { calculateRelativeHumidity } from "./helpers";
import RaindropCanvas from "./RaindropCanvas";
import { LayerControls } from "./Controls";
import styles from "./precipitation.module.css"

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
  { src: "/img/precipitation/rain_puddle.png", name: "puddle", enable: false },
  {
    src: "/img/precipitation/pile_snow.png",
    name: "snow-puddle",
    enable: false,
  },
];

const PrecipCanvas: React.FC = () => {
  const [temp, setTemp] = useState<number[]>([70, 70, 70, 70]); // State for temperatures
  const [dewPoint, setDewPoint] = useState<number[]>([66, 68, 68, 68]); // State for dew points
  const [precipImages, setPrecipImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({}); // State for precipitation images
  //const [cloudImage, setCloudImage] = useState<Images>(backgroundImg[0]); // State for background image
  const [isSliding, setIsSliding] = useState<boolean>(false); // State to track if sliding is in progress

  // Calculate relative humidity for each temperature and dew point pair
  const relativeHumidity = useMemo(() =>
    temp.map((t, index) => calculateRelativeHumidity(t, dewPoint[index])),
    [temp, dewPoint]
  );

  // Determine the cloud image based on the relative humidity of the first layer
  const cloudImage = useMemo(() => {
    if (relativeHumidity[0] >= 80) return backgroundImg[2];
    if (relativeHumidity[0] >= 50) return backgroundImg[1];
    return backgroundImg[0];
  }, [relativeHumidity]);

  // Handle changes to the temperature inputs
  const handleTempChange = useCallback((index: number, value: number) => {
    setTemp(prev => {
      const newTemp = [...prev];
      newTemp[index] = value;
      return newTemp;
    });
    setIsSliding(true);
  }, []);

  // Handle changes to the dew point inputs
  const handleDewPointChange = useCallback((index: number, value: number) => {
    setDewPoint(prev => {
      const newDewPoint = [...prev];
      newDewPoint[index] = Math.min(value, temp[index]);
      return newDewPoint;
    });
    setIsSliding(true);
  }, [temp]);

  // Ensure dew points do not exceed corresponding temperatures
  useEffect(() => {
    setDewPoint(prev => prev.map((dp, index) => Math.min(dp, temp[index])));
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
  }, [isSliding]);

  // Call this function when the slider interaction ends
  const handleSlidingEnd = useCallback(() => {
    setTimeout(() => {
      setIsSliding(false);
    }, 100);
  }, []);

  return (
    <div
      className={styles.precipAnimation}

    >
      {/* Display the background cloud image */}
      <img
        src={cloudImage.src || "/placeholder.svg"}
        alt={cloudImage.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Canvas for drawing raindrops */}
      <RaindropCanvas
        temp={temp}
        relativeHumidity={relativeHumidity}
        precipImages={precipImages}
        cloudImage={cloudImage}
        isSliding={isSliding}
      />
      <div className={styles.layerControl}>
        <LayerControls
          temp={temp}
          dewPoint={dewPoint}
          relativeHumidity={relativeHumidity}
          handleTempChange={handleTempChange}
          handleDewPointChange={handleDewPointChange}
          handleSlidingEnd={handleSlidingEnd}
        />
      </div>
    </div>
  );
};

export default PrecipCanvas;



// //RainCanvas.tsx
// import React, { useEffect, useState } from "react";
// import { Images, Precips } from "./interfaces";
// import { calculateRelativeHumidity } from "./helpers";
// import RaindropCanvas from "./RaindropCanvas";
// import { LayerControls } from "./Controls";
// import styles from "./precipitation.module.css"

// // Define background images for different weather conditions
// const backgroundImg: Images[] = [
//   { src: "/img/clouds/sunny.png", name: "sunny" },
//   { src: "/img/clouds/lightCloud.png", name: "light cloud" },
//   { src: "/img/clouds/darkCloud.png", name: "dark cloud" },
// ];

// // Define precipitation images
// const PrecipImages: Precips[] = [
//   { src: "/img/precipitation/raindrop.png", name: "raindrop", enable: false },
//   { src: "/img/precipitation/sleet.png", name: "sleet", enable: false },
//   {
//     src: "/img/precipitation/snow-grains.png",
//     name: "snow-grains",
//     enable: false,
//   },
//   {
//     src: "/img/precipitation/supercooled-droplet.png",
//     name: "supercooled-Droplets",
//     enable: false,
//   },
//   {
//     src: "/img/precipitation/snowflake_ice-crystal.png",
//     name: "snow",
//     enable: false,
//   },
//   { src: "/img/precipitation/rain_puddle.png", name: "puddle", enable: false },
//   {
//     src: "/img/precipitation/pile_snow.png",
//     name: "snow-puddle",
//     enable: false,
//   },
// ];

// const PrecipCanvas: React.FC = () => {
//   const [temp, setTemp] = useState<number[]>([70, 70, 70, 70]); // State for temperatures
//   const [dewPoint, setDewPoint] = useState<number[]>([66, 68, 68, 68]); // State for dew points
//   const [precipImages, setPrecipImages] = useState<{
//     [key: string]: HTMLImageElement;
//   }>({}); // State for precipitation images
//   //const [cloudImage, setCloudImage] = useState<Images>(backgroundImg[0]); // State for background image
//   const [isSliding, setIsSliding] = useState<boolean>(false); // State to track if sliding is in progress

  

//   // Calculate relative humidity for each temperature and dew point pair
//   const relativeHumidity = temp.map((t, index) =>
//     calculateRelativeHumidity(t, dewPoint[index])
//   );

//   // Determine the cloud image based on the relative humidity of the first layer

//   let cloudImage = backgroundImg[0];
//   if (relativeHumidity[0] >= 80) {
//     cloudImage = backgroundImg[2];
//   } else if (relativeHumidity[0] >= 50) {
//     cloudImage = backgroundImg[1];
//   }

//   // Handle changes to the temperature inputs
//   const handleTempChange = (index: number, value: number) => {
//     const newTemp = [...temp];
//     newTemp[index] = value;
//     setTemp(newTemp);
//     setIsSliding(true); // Set sliding to true when input changes
//   };

//   // Handle changes to the dew point inputs
//   const handleDewPointChange = (index: number, value: number) => {
//     const newDewPoint = [...dewPoint];
//     newDewPoint[index] = Math.min(value, temp[index]);
//     setDewPoint(newDewPoint);
//     setIsSliding(true); // Set sliding to true when input changes
//   };

//   // Ensure dew points do not exceed corresponding temperatures
//   useEffect(() => {
//     const updatedDewPoints = dewPoint.map((dp, index) =>
//       Math.min(dp, temp[index])
//     );
//     setDewPoint(updatedDewPoints);
//   }, [temp]);

//   // Load all precipitation images asynchronously
//   useEffect(() => {
//     const loadImages = async () => {
//       const images: { [key: string]: HTMLImageElement } = {};
//       for (const precip of PrecipImages) {
//         const img = new Image();
//         img.src = precip.src;
//         await new Promise<void>((resolve) => {
//           img.onload = () => resolve();
//         });
//         images[precip.name] = img;
//       }
//       setPrecipImages(images);
//     };
//     loadImages();
//   }, [isSliding]);

//   // Call this function when the slider interaction ends
//   const handleSlidingEnd = () => {
//     setIsSliding(false);
//   };

//   return (
//     <div
//       className={styles.precipAnimation}
     
//     >
//       {/* Display the background cloud image */}
//       <img
//         src={cloudImage.src}
//         alt={cloudImage.name}
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       {/* Canvas for drawing raindrops */}
//       <RaindropCanvas
//         temp={temp}
//         relativeHumidity={relativeHumidity}
//         precipImages={precipImages}
//         cloudImage={cloudImage}
//         isSliding={isSliding}
//       />
//       <div className={styles.layerControl}>
//         <LayerControls
//           temp={temp}
//           dewPoint={dewPoint}
//           relativeHumidity={relativeHumidity}
//           handleTempChange={handleTempChange}
//           handleDewPointChange={handleDewPointChange}
//           handleSlidingEnd={handleSlidingEnd}
//         />
//       </div>
//     </div>
//   );
// };

// export default PrecipCanvas;
