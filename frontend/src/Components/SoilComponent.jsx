import React from 'react';

const SoilComponent = ({ soilType }) => {
  // Construct the image URL based on the soilType variable
  const imageUrl = `src/static/imgs/${soilType}.png`;

  return (
    <div>

        <img src={imageUrl} alt={`${soilType} Soil`} /> 
    </div>
 
  );
};

export default SoilComponent;
