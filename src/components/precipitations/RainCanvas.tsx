import React, { useEffect, useState } from "react";
import { Images, Precips } from "./interfaces";
import { calculateRelativeHumidity } from "./helpers";
import RaindropCanvas from "./PrecipitationCanvas";
import { LayerControls } from "./Controls";

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

const RainCanvas: React.FC = () => {
  const [temp, setTemp] = useState<number[]>([70, 70, 70, 70]); // State for temperatures
  const [dewPoint, setDewPoint] = useState<number[]>([50, 50, 50, 50]); // State for dew points
  const [precipImages, setPrecipImages] = useState<{ [key: string]: HTMLImageElement }>({}); // State for precipitation images
  //const [cloudImage, setCloudImage] = useState<Images>(backgroundImg[0]); // State for background image
  const [isSliding, setIsSliding] = useState<boolean>(false); // State to track if sliding is in progress

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
    setIsSliding(true); // Set sliding to true when input changes
  };

  // Handle changes to the dew point inputs
  const handleDewPointChange = (index: number, value: number) => {
    const newDewPoint = [...dewPoint];
    newDewPoint[index] = Math.min(value, temp[index]);
    setDewPoint(newDewPoint);
    setIsSliding(true); // Set sliding to true when input changes
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
  }, [isSliding]);

  // Call this function when the slider interaction ends
  const handleSlidingEnd = () => {
    setIsSliding(false);
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
      <RaindropCanvas
        temp={temp}
        relativeHumidity={relativeHumidity}
        precipImages={precipImages}
        cloudImage={cloudImage}
        isSliding={isSliding}
      />
       <div className="inputs relative p-4">
        <div className="pt-14">
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
    </div>
  );
};

export default RainCanvas;
// import React, { useEffect, useState, useRef } from "react";
// import { Images, Precips, Raindrop } from "./interfaces";
// import { calculateRelativeHumidity, determinePrecipType, generateRaindrops, getNumDrops } from "./helpers";
// import RaindropCanvas from "./PrecipitationCanvas";


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
//   { src: "/img/precipitation/snow-grains.png", name: "snow-grains", enable: false },
//   { src: "/img/precipitation/supercooled-droplet.png", name: "supercooled-Droplets", enable: false },
//   { src: "/img/precipitation/snowflake_ice-crystal.png", name: "snow", enable: false },
// ];

// // Helper function to convert Fahrenheit to Celsius


// // Main React functional component
// const RainCanvas: React.FC = () => {
//   const [temp, setTemp] = useState<number[]>([70, 70, 70, 70]); // State for temperatures
//   const [dewPoint, setDewPoint] = useState<number[]>([50, 50, 50, 50]); // State for dew points
//   const [precipImages, setPrecipImages] = useState<{ [key: string]: HTMLImageElement }>({}); // State for precipitation images

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
//   };

//   // Handle changes to the dew point inputs
//   const handleDewPointChange = (index: number, value: number) => {
//     const newDewPoint = [...dewPoint];
//     newDewPoint[index] = Math.min(value, temp[index]);
//     setDewPoint(newDewPoint);
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
//   }, []);



//   return (
//     <div className="w-100 h-screen relative border border-solid border-black overflow-hidden">
//       {/* Display the background cloud image */}
//       <img
//         src={cloudImage.src}
//         alt={cloudImage.name}
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       {/* Canvas for drawing raindrops */}
//       <RaindropCanvas
       
// temp={temp}
// relativeHumidity={relativeHumidity}
// precipImages={precipImages}
// cloudImage={cloudImage}
// />
//       <div className="inputs relative p-4">
//         <div className="pt-14">
//           {/* Inputs for adjusting temperature and dew point */}
//           {temp.map((_t, index) => (
//             <div key={index} className="layer">
//               <h2>Layer {index + 1}</h2>
//               <div>
//                 <label>Temperature:</label>
//                 <input
//                   type="range"
//                   min="20"
//                   max="100"
//                   value={temp[index]}
//                   onChange={(e) =>
//                     handleTempChange(index, Number(e.target.value))
//                   }
//                 />
//                 <span className="fah">{temp[index]}°F</span>
//               </div>
//               <div>
//                 <label>Dew Point:</label>
//                 <input
//                   type="range"
//                   min="20"
//                   max="100"
//                   value={dewPoint[index]}
//                   onChange={(e) =>
//                     handleDewPointChange(index, Number(e.target.value))
//                   }
//                 />
//                 <span className="fah">{dewPoint[index]}°F</span>
//               </div>
//               <div>
//                 <label>Relative Humidity:</label>
//                 <span>{relativeHumidity[index]}%</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RainCanvas;
