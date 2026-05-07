import React from 'react';
import { useGameStore } from '../store/gameStore';

export function HUD({ onPause, isPaused }: { onPause: () => void, isPaused: boolean }) {
  const { height, score, modulesPlaced } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col z-40 select-none">
      
      {/* Header Navigation */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-[#0a0a0f] pointer-events-auto shadow-md">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-lg sm:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ff] to-[#ffcc00]">
            SIGNAL SPIRE
          </div>
          <div className="hidden sm:block h-4 w-[1px] bg-white/20"></div>
          <div className="hidden sm:flex flex-col sm:flex-row gap-1 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
            <span className="text-[#00f2ff]">Sec: Ionosphere</span>
            <span className="text-white/40">Alt: {height}m</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {/* Height & Score combined view for mobile */}
           <div className="flex sm:hidden flex-col items-end">
             <span className="text-[#00f2ff] text-[10px] font-mono font-bold tracking-widest">{height}m</span>
             <span className="text-[#ffcc00] text-[10px] font-mono font-bold tracking-widest">{score} SIG</span>
           </div>
           
           <button 
             onClick={onPause}
             className="px-4 py-1.5 bg-[#00f2ff] text-black font-bold text-[10px] sm:text-[11px] tracking-widest uppercase hover:bg-white transition-colors border border-transparent active:scale-95"
           >
             {isPaused ? 'RESUME' : 'PAUSE'}
           </button>
        </div>
      </header>

      {/* Main Viewport Content - left side stats for desktop HUD */}
      <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-6 bg-[#08080c] shadow-[10px_0_30px_rgba(0,0,0,0.5)] hidden lg:flex">
             <div className="space-y-1">
               <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Signal Strength</label>
               <div className="text-4xl font-mono font-bold text-[#00f2ff]">{score}</div>
               <div className="w-full h-1 bg-white/10 mt-2 rounded overflow-hidden">
                 <div className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" style={{ width: `${Math.min(100, (score % 1000) / 10)}%` }}></div>
               </div>
             </div>

             <div className="space-y-4">
               <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Warden Inventory</label>
               <div className="grid grid-cols-2 gap-2">
                 <div className="p-3 bg-white/5 border border-white/10">
                   <div className="text-[#ff00ff] text-lg font-bold">{modulesPlaced}</div>
                   <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1">Modules</div>
                 </div>
                 <div className="p-3 bg-white/5 border border-white/10">
                   <div className="text-[#ffcc00] text-lg font-bold">{height}m</div>
                   <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1">Total Alt</div>
                 </div>
               </div>
             </div>

             <div className="mt-auto p-4 border border-dashed border-white/20 opacity-60 bg-[#0a0a0f]">
               <div className="text-[10px] uppercase font-mono mb-2 text-white/80 font-bold">Stability Report</div>
               <div className="flex justify-between items-center text-white/80 border-b border-white/10 pb-1 mb-1">
                 <span className="text-[10px] uppercase tracking-widest">Integrity</span>
                 <span className="text-[#00ff44] text-[10px] font-mono">OPTIMAL</span>
               </div>
               <div className="flex justify-between items-center text-white/80">
                 <span className="text-[10px] uppercase tracking-widest">Wind Shear</span>
                 <span className="text-[#ffcc00] text-[10px] font-mono">NOMINAL</span>
               </div>
             </div>
          </aside>
      </div>

    </div>
  );
}
