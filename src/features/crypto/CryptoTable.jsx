// src/features/crypto/CryptoTable.js
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from './cryptoSlice';
import {PriceCell} from './PriceCell';
import {PercentageCell} from './PercentageCell';
import {ChartCell} from './ChartCell'

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);
  // Use refs to store previous prices for highlighting changes
  const prevPrices = useRef({});
  
  // Format large numbers with appropriate suffixes (K, M, B, T)
  const formatLargeNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-2 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">1h %</th>
            <th className="py-3 px-4 text-right">24h %</th>
            <th className="py-3 px-4 text-right">7d %</th>
            <th className="py-3 px-4 text-right">Market Cap</th>
            <th className="py-3 px-4 text-right">24h Volume</th>
            <th className="py-3 px-4 text-right">Circulating Supply</th>
            <th className="py-3 px-4 text-center">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            // Store current price to ref after using it for comparison
            const currentPrevPrice = prevPrices.current[asset.id];
            prevPrices.current[asset.id] = asset.price;
            
            return (
              <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-2">{asset.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{asset.logo}</span>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-gray-500 text-sm">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <PriceCell value={asset.price} previousValue={currentPrevPrice} />
                </td>
                <td className="py-4 px-4 text-right">
                  <PercentageCell value={asset.percentChange1h} />
                </td>
                <td className="py-4 px-4 text-right">
                  <PercentageCell value={asset.percentChange24h} />
                </td>
                <td className="py-4 px-4 text-right">
                  <PercentageCell value={asset.percentChange7d} />
                </td>
                <td className="py-4 px-4 text-right">
                  {formatLargeNumber(asset.marketCap)}
                </td>
                <td className="py-4 px-4 text-right">
                  {formatLargeNumber(asset.volume24h)}
                </td>
                <td className="py-4 px-4 text-right">
                  {asset.circulatingSupply.toFixed(2)} {asset.symbol}
                  {asset.maxSupply && (
                    <span className="text-xs text-gray-500"> / {asset.maxSupply} {asset.symbol}</span>
                  )}
                </td>
                <td className="py-4 px-4 flex justify-center">
                  <ChartCell chartType={asset.chart7d} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export {CryptoTable};