import { useEffect, useState } from 'react';
import { StoreProvider, useStore } from './store';
import { AuthProvider, useAuth } from './lib/auth';
import { supabase, isAdminIdentity, extractPhone } from './lib/supabase';
import { Onboarding } from './screens/Onboarding';
import { Signup } from './screens/Signup';
import { Dashboard } from './screens/Dashboard';
import { AIChat } from './screens/AIChat';
import { Loading } from './screens/Loading';
import { Editor } from './screens/Editor';
import { Support } from './screens/Support';
import { Manual } from './screens/Manual';
import { SettingsScreen } from './screens/SettingsScreen';
import { AdminDashboard } from './screens/AdminDashboard';
import { AdminLanding } from './screens/AdminLanding';
import { AccessDeniedModal } from './components/AccessDeniedModal';
import { ShieldX, Zap, Sparkles } from 'lucide-react';
import { Modules } from './screens/Modules';
import { ClientDashboard } from './screens/ClientDashboard';
import { DashboardUsuario } from './screens/DashboardUsuario';
import { BarbeariaApp } from './screens/BarbeariaApp';

function useIsMasterAdmin() {
  const { user } = useAuth();
  if (!user) return false;
  return isAdminIdentity(user.email, extractPhone(user));
}

function AdminDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-black">
      <div className="border border-rose-500/30 bg-neutral-900/80 backdrop-blur-md rounded-3xl p-8 text-center max-w-sm shadow-[0_0_20px_rgba(244,63,94,0.15)]">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 flex items-center justify-center mx-auto mb-4">
          <ShieldX className="w-7 h-7 text-rose-400" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Acesso restrito</h1>
        <p className="text-sm text-white/60 mb-6">
          Suas credenciais não têm permissão para acessar o painel de Administrador Geral da Hapres.
        </p>
        <button
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

function Router() {
  const { state, dispatch } = useStore();
  const { user } = useAuth();
  const isMaster = useIsMasterAdmin();

  const [deniedRoute, setDeniedRoute] = useState(false);
  useEffect(() => {
    const check = () => {
      if (window.location.pathname.replace(/\/$/, '') === '/admin-mestre') {
        setDeniedRoute(!isMaster);
      } else {
        setDeniedRoute(false);
      }
    };
    check();
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, [isMaster]);

  useEffect(() => {
    if (!user && state.screen !== 'onboarding' && state.screen !== 'signup') {
      dispatch({ type: 'SET_SCREEN', screen: 'signup' });
    }
  }, [user, state.screen, dispatch]);

  useEffect(() => {
    if (!user) return;
    if (state.screen === 'signup' || state.screen === 'onboarding') {
      if (isMaster) {
        dispatch({ type: 'SET_SCREEN', screen: 'admin-landing' });
      } else {
        dispatch({ type: 'SIGNUP', user: { id: user.id, email: user.email ?? '', fullName: user.email?.split('@')[0] ?? 'Usuário', whatsapp: '', password: '', createdAt: Date.now() } });
      }
    }
  }, [user, isMaster, state.screen, dispatch]);

  useEffect(() => {
    if (state.screen === 'scratch') {
      dispatch({ type: 'SET_ACTIVE_PROJECT', id: state.scratchProjectId ?? null });
      dispatch({ type: 'SET_SCREEN', screen: 'editor' });
    }
  }, [state.screen, state.scratchProjectId, dispatch]);

  const showDenied = deniedRoute;

  let screen: React.ReactNode;
  switch (state.screen) {
    case 'onboarding': screen = <Onboarding />; break;
    case 'signup': screen = <Signup />; break;
    case 'admin-landing': screen = isMaster ? <AdminLanding /> : <Signup />; break;
    case 'dashboard': screen = <BarbeariaApp />; break;
    case 'dashboard-usuario': screen = <DashboardUsuario />; break;
    case 'ai-chat': screen = <AIChat />; break;
    case 'loading': screen = <Loading />; break;
    case 'editor': screen = <Editor />; break;
    case 'support': screen = <Support />; break;
    case 'manual': screen = <Manual />; break;
    case 'settings': screen = <SettingsScreen />; break;
    case 'admin': screen = isMaster ? <AdminDashboard /> : <AdminDenied />; break;
    case 'modules': screen = <Modules />; break;
    default: screen = <Dashboard />;
  }

  return (
    <>
      {screen}
      {showDenied && (
        <AccessDeniedModal
          onClose={() => {
            window.history.pushState({}, '', '/');
            setDeniedRoute(false);
            dispatch({ type: 'SET_SCREEN', screen: 'dashboard' });
          }}
        />
      )}
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'cyberpunk' | 'creative'>('cyberpunk');

  // Aplica classes globais no HTML do app para forçar a renderização rica
  const themeClasses = theme === 'cyberpunk' 
    ? 'bg-[#000000] text-[#deff9a] scheme-cyberpunk font-mono' 
    : 'bg-[#0b0f19] text-[#f3f4f6] scheme-creative font-sans';

  const frameClass = `h-[100dvh] w-full mx-auto relative overflow-hidden transition-all duration-500 ${themeClasses}`;

  return (
    <AuthProvider>
      <StoreProvider>
        {/* Botão Seletor de Estilo Flutuante e Rico */}
        <div className="fixed top-3 right-3 z-[9999] flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-lg">
          <button
            onClick={() => setTheme('cyberpunk')}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-bold transition-all ${theme === 'cyberpunk' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-white/60 hover:text-white'}`}
          >
            <Zap className="w-3.5 h-3.5" /> Cyberpunk
          </button>
          <button
            onClick={() => setTheme('creative')}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-bold transition-all ${theme === 'creative' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'text-white/60 hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Criativo
          </button>
        </div>
        
        <Shell frameClass={frameClass} theme={theme} />
      </StoreProvider>
    </AuthProvider>
  );
}

function Shell({ frameClass, theme }: { frameClass: string, theme: 'cyberpunk' | 'creative' }) {
  const { state } = useStore();
  const wide = state.screen === 'admin' || state.screen === 'admin-landing' || state.screen === 'dashboard' || state.screen === 'dashboard-usuario';
  
  return (
    <div data-theme={theme} className={wide ? `h-[100dvh] w-full relative overflow-hidden transition-all duration-500 ${theme === 'cyberpunk' ? 'bg-black' : 'bg-[#0b0f19]'}` : `${frameClass} max-w-md`}>
      <Router />
    </div>
  );
}

void supabase;

