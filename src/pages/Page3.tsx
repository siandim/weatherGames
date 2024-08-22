// src/App.tsx
import React from "react";
import RainCanvas from "../components/precipitations/RainCanvas";
//import Precip from "../components/precipitations/Precip";

const Page3: React.FC = () => {
  // Example values for temperature, dew point
  return (
    <div>
      <div className="flex justify-center items-center"> <RainCanvas /></div>
    
    </div>
  );
};

export default Page3;
