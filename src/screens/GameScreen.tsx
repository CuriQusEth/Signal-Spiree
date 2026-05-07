import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { CanvasRenderer } from '../game/components/CanvasRenderer';
import { HUD } from './HUD';
import { motion, AnimatePresence } from 'motion/react';

export function GameScreenComponent() {
  const { setScreen, updateStats } = useGameStore();
  const [isPaused, setIsPaused] = useState(false);

  // We will pass game callbacks to the canvas renderer

  const handleGameOver = (height: number, score: number, modules: number) => {
    updateStats(height, score, modules);
    setScreen('GAMEOVER');
  };

  return (
    <div className="w-full h-full relative bg-gray-900 overflow-hidden">
      {/* The actual canvas game */}
      <CanvasRenderer 
        isPaused={isPaused} 
        onGameOver={handleGameOver}
        onUpdateStats={updateStats}
      />

      {/* Head Up Display */}
      <HUD onPause={() => setIsPaused(!isPaused)} isPaused={isPaused} />

      <AnimatePresence>
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050507]/90 z-50 flex flex-col items-center justify-center backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Mission Paused</h2>
              <div className="w-full h-[1px] bg-white/20 mb-2"></div>
              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={() => setIsPaused(false)}
                  className="w-full py-4 bg-[#00f2ff] text-black font-black text-xs tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                >
                  Resume
                </button>
                <button 
                  onClick={() => setScreen('TITLE')}
                  className="w-full py-3 bg-transparent text-white/40 font-bold text-[10px] tracking-widest uppercase border border-white/10 hover:text-white hover:bg-white/5 transition-all"
                >
                  Abort Mission
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
