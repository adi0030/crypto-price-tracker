// src/features/crypto/ChartCell.js
import React from 'react';

// SVG mini charts for 7-day price history
const chartPatterns = {
  uptrend: (
    <svg width="120" height="40" viewBox="0 0 120 40" className="text-green-500">
      <path 
        d="M0,30 L10,28 L20,32 L30,25 L40,22 L50,20 L60,15 L70,18 L80,12 L90,8 L100,5 L110,2 L120,0" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  ),
  downtrend: (
    <svg width="120" height="40" viewBox="0 0 120 40" className="text-red-500">
      <path 
        d="M0,10 L10,12 L20,8 L30,15 L40,18 L50,20 L60,25 L70,22 L80,28 L90,32 L100,35 L110,38 L120,40" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  ),
  stable: (
    <svg width="120" height="40" viewBox="0 0 120 40" className="text-gray-500">
      <path 
        d="M0,20 L10,19.5 L20,20.5 L30,20 L40,19.8 L50,20.2 L60,20 L70,19.7 L80,20.3 L90,20 L100,19.9 L110,20.1 L120,20" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  ),
  mixed: (
    <svg width="120" height="40" viewBox="0 0 120 40" className="text-blue-500">
      <path 
        d="M0,20 L10,15 L20,25 L30,18 L40,22 L50,16 L60,28 L70,12 L80,24 L90,20 L100,15 L110,25 L120,18" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  ),
};

const ChartCell = ({ chartType }) => {
  return (
    <div className="w-24 h-10 flex items-center">
      {chartPatterns[chartType] || chartPatterns.stable}
    </div>
  );
};

export {ChartCell};