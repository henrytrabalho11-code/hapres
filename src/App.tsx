import { useEffect, useState } from 'react';
import { StoreProvider, useStore } from './store/index';

function Router() {
  const { state } = useStore();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Hapres</h1>
        <p className="text-gray-400">O projeto foi buildado com sucesso! 🚀</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
