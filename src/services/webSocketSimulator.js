// src/services/webSocketSimulator.js
import { updateAsset } from '../features/crypto/cryptoSlice';

const createWebSocketSimulator = (store) => {
  let intervalId = null;

  // Generate a random percentage change
  const generateRandomChange = (baseValue) => {
    const change = (Math.random() * 2 - 1) * 0.5; // Random between -0.5% and +0.5%
    return parseFloat((baseValue + change).toFixed(2));
  };

  // Generate a random price change based on current price
  const generateRandomPrice = (currentPrice) => {
    const changePercent = (Math.random() * 2 - 1) * 0.3; // Random between -0.3% and +0.3%
    const newPrice = currentPrice * (1 + changePercent / 100);
    return parseFloat(newPrice.toFixed(2));
  };

  // Generate random volume change
  const generateRandomVolume = (currentVolume) => {
    const changePercent = (Math.random() * 6 - 3); // Random between -3% and +3%
    const newVolume = currentVolume * (1 + changePercent / 100);
    return Math.round(newVolume);
  };

  // Start simulating WebSocket updates
  const startUpdates = () => {
    if (intervalId) return;

    intervalId = setInterval(() => {
      const assets = store.getState().crypto.assets;
      
      // Randomly select 1-3 assets to update
      const numAssetsToUpdate = Math.floor(Math.random() * 3) + 1;
      const assetIndices = new Set();
      
      while (assetIndices.size < numAssetsToUpdate) {
        assetIndices.add(Math.floor(Math.random() * assets.length));
      }
      
      assetIndices.forEach(index => {
        const asset = assets[index];
        
        // Skip USDT updates most of the time to simulate stablecoin behavior
        if (asset.symbol === 'USDT' && Math.random() > 0.1) return;
        
        // Create updates object
        const updates = {
          price: generateRandomPrice(asset.price),
          percentChange1h: generateRandomChange(asset.percentChange1h),
          percentChange24h: generateRandomChange(asset.percentChange24h),
          percentChange7d: generateRandomChange(asset.percentChange7d),
          volume24h: generateRandomVolume(asset.volume24h),
        };
        
        // Dispatch update action
        store.dispatch(updateAsset({ id: asset.id, updates }));
      });
    }, 1500); // Update every 1.5 seconds
  };

  // Stop simulating WebSocket updates
  const stopUpdates = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Return the public interface
  return {
    startUpdates,
    stopUpdates
  };
};

export default createWebSocketSimulator;