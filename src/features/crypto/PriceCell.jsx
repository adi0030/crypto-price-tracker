// src/features/crypto/PriceCell.js
import React, { useEffect, useState } from 'react';

const PriceCell = ({ value, previousValue }) => {
  const [highlight, setHighlight] = useState('');
  
  // Format the price with $ and appropriate decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 10 ? 2 : value < 1000 ? 2 : 0,
    maximumFractionDigits: value < 10 ? 6 : value < 1000 ? 2 : 0,
  }).format(value);
  
  // Add highlighting effect when the price changes
  useEffect(() => {
    if (previousValue && value > previousValue) {
      setHighlight('bg-green-100');
    } else if (previousValue && value < previousValue) {
      setHighlight('bg-red-100');
    }
    
    // Remove highlight after animation
    const timer = setTimeout(() => {
      setHighlight('');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [value, previousValue]);
  
  return (
    <span className={`inline-block w-full transition-colors duration-1000 ${highlight}`}>
      {formattedPrice}
    </span>
  );
};

export {PriceCell};