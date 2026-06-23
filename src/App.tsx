import React from 'react';
import { useStore } from './store/index';
import PayPro from './screens/PayPro';

export default function App() {
  const { state } = useStore();

  // Gerenciador de navegação simples e seguro
  switch (state.currentScreen) {
    case 'paypro':
      return <PayPro />;
    case 'dashboard':
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold text-purple-500 mb-2">Painel Central Hapres 👑</h1>
          <p className="text-gray-400">O ecossistema definitivo está sendo ativado...</p>
        </div>
      );
    default:
      // Tela padrão inicial se algo falhar
      return <PayPro />;
  }
}
