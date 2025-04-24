// src/features/crypto/PercentageCell.js
import React from 'react';

const PercentageCell = ({ value }) => {
  // Determine color based on value
  const color = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500';
  
  // Format the value with a plus sign for positive values
  const formattedValue = value > 0 
    ? `+${value.toFixed(2)}%` 
    : `${value.toFixed(2)}%`;
  
  return (
    <span className={`font-medium ${color}`}>
      {formattedValue}
    </span>
  );
};

export {PercentageCell};