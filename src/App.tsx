import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './lib/wagmi';
import { useGameStore } from './store/gameStore';
import { TitleScreen } from './screens/TitleScreen';
import { GameScreenComponent } from './screens/GameScreen';
import { GameOverScreen } from './screens/GameOverScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';

const queryClient = new QueryClient();

function GameRouter() {
  const currentScreen = useGameStore(state => state.screen);

  return (
    <div className="w-full h-full relative z-10">
      {currentScreen === 'TITLE' && <TitleScreen />}
      {currentScreen === 'GAME' && <GameScreenComponent />}
      {currentScreen === 'GAMEOVER' && <GameOverScreen />}
      {currentScreen === 'LEADERBOARD' && <LeaderboardScreen />}
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <main className="fixed inset-0 w-full h-full bg-black overflow-hidden font-sans text-slate-100">
           <GameRouter />
        </main>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
