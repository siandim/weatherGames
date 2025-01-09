// src/App.tsx
import React from "react";
import PrecipWithDetails from "../components/precipitations/PrecipWithDetails";

const PrecipitationPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <PrecipWithDetails />
      </div>
     
    </div>
  );
};

export default PrecipitationPage;
