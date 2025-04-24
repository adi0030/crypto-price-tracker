// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from './app/store';
import {CryptoTable} from './features/crypto/CryptoTable';
import createWebSocketSimulator from './services/webSocketSimulator';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Initialize WebSocket simulator
    const wsSimulator = createWebSocketSimulator(store);
    
    // Start simulated price updates
    wsSimulator.startUpdates();
    
    // Clean up when component unmounts
    return () => {
      wsSimulator.stopUpdates();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Crypto Price Tracker</h1>
        <p className="text-gray-600 mt-2">
          Real-time cryptocurrency price updates (refreshed every 1.5 seconds)
        </p>
      </header>
      
      <main>
        <CryptoTable />
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Data updates are simulated and do not reflect actual market prices.</p>
      </footer>
    </div>
  );
}

export default App;