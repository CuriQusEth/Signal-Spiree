import { create } from 'zustand';

export type GameScreen = 'TITLE' | 'GAME' | 'GAMEOVER' | 'LEADERBOARD';

interface GameState {
  screen: GameScreen;
  height: number;
  score: number;
  modulesPlaced: number;
  highestSpire: number;
  isWalletConnected: boolean;
  address: string | null;
  
  setScreen: (screen: GameScreen) => void;
  updateStats: (height: number, score: number, modulesPlacd: number) => void;
  setHighestSpire: (highest: number) => void;
  setWallet: (connected: boolean, address: string | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  screen: 'TITLE',
  height: 0,
  score: 0,
  modulesPlaced: 0,
  highestSpire: 0,
  isWalletConnected: false,
  address: null,

  setScreen: (screen) => set({ screen }),
  updateStats: (height, score, modulesPlaced) => set(state => ({
    height: Math.max(state.height, height),
    score,
    modulesPlaced
  })),
  setHighestSpire: (highest) => set({ highestSpire: highest }),
  setWallet: (connected, address) => set({ isWalletConnected: connected, address }),
  resetGame: () => set({ height: 0, score: 0, modulesPlaced: 0 })
}));
