// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Sample initial data for cryptocurrencies
const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '₿',
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      chart7d: 'uptrend', // This could be a data URL or path to image
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'Ξ',
      price: 1802.46,
      percentChange1h: 0.60,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chart7d: 'uptrend',
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '₮',
      price: 1.00,
      percentChange1h: 0.00,
      percentChange24h: 0.00,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chart7d: 'stable',
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'Ⓧ',
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chart7d: 'uptrend',
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'BNB',
      price: 606.65,
      percentChange1h: 0.09,
      percentChange24h: -1.20,
      percentChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      chart7d: 'mixed',
    },
  ],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex] = { ...state.assets[assetIndex], ...updates };
      }
    },
    updateAllAssets: (state, action) => {
      state.assets = action.payload;
    },
  },
});

export const { updateAsset, updateAllAssets } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = state => state.crypto.assets;
export const selectAssetById = (state, id) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;