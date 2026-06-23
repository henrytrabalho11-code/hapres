import React from 'react';
import { useStore } from '../store/index';

export default function PayPro() {
  const { dispatch } = useStore();

  const handleSubscribe = (plan: string) => {
    console.log(`Plano selecionado: ${plan}`);
    // Avança para a próxima tela do fluxo
    dispatch({ type: 'SET_SCREEN', screen: 'dashboard' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
          HAPRES SOVEREIGN PRO
        </h1>
        <p className="text-gray-400 text-lg">
          Desbloqueie o poder do Elon Musk dos aplicativos. Escolha o seu arsenal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Plano Cyber Standard */}
        <div className="border border-gray-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:border-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/10">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Cyber Standard</h2>
            <p className="text-gray-400 mb-6">Para criadores e entusiastas iniciais.</p>
            <div className="text-4xl font-extrabold mb-6">R$ 0 <span className="text-sm font-normal text-gray-500">/mês</span></div>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">🟢 Modo Cyber Básico</li>
              <li className="flex items-center">🟢 Construtor Canva Standard</li>
              <li className="flex items-center">❌ Omni-APIs Avançadas (Pix, Bancos)</li>
              <li className="flex items-center">❌ Assistente IA Autônoma</li>
            </ul>
          </div>
          <button onClick={() => handleSubscribe('standard')} className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-xl transition-all">
            Começar Grátis
          </button>
        </div>

        {/* Plano Criativo Pro */}
        <div className="border-2 border-purple-500 bg-neutral-900/80 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:border-purple-400 transition-all duration-300 shadow-xl shadow-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Recomendado
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-400 mb-2">Criativo Pro</h2>
            <p className="text-gray-400 mb-6">O império completo de funções sem limites.</p>
            <div className="text-4xl font-extrabold mb-6">R$ 97 <span className="text-sm font-normal text-gray-500">/mês</span></div>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">🚀 Modo Cyber & Modo Criativo Completo</li>
              <li className="flex items-center">🚀 Canva Avançado (Arrastar e Soltar)</li>
              <li className="flex items-center">🚀 Acesso Total a Omni-APIs (Pix/IA)</li>
              <li className="flex items-center">🚀 Assistente IA Super Inteligente</li>
            </ul>
          </div>
          <button onClick={() => handleSubscribe('pro')} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
            Assinar Arsenal Pro
          </button>
        </div>
      </div>
    </div>
  );
}

