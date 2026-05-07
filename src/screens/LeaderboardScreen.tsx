import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { Trophy, ChevronLeft } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { addr: '0x12..34', score: 14500, height: 1200 },
  { addr: '0x99..bb', score: 13200, height: 1100 },
  { addr: '0xbc..9c', score: 12100, height: 950 }, // your code
  { addr: '0x7e..22', score: 8500,  height: 800 },
  { addr: '0xfa..11', score: 5400,  height: 600 },
];

export function LeaderboardScreen() {
  const { setScreen } = useGameStore();

  return (
    <div className="w-full h-full flex flex-col bg-[#050507] text-[#e0e0e0] p-6 pt-12 relative overflow-hidden">
       <button 
          onClick={() => setScreen('TITLE')}
          className="absolute top-6 left-6 p-2 bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
       >
          <ChevronLeft className="w-6 h-6" />
       </button>
       
       <div className="mt-8 mb-10 flex flex-col items-center">
          <Trophy className="w-12 h-12 text-[#ffcc00] drop-shadow-[0_0_10px_rgba(255,204,0,0.8)] mb-4" />
          <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc00] via-[#ff00ff] to-[#00f2ff] uppercase">
            Hybrid Logs
          </h2>
          <p className="text-white/40 font-bold text-[10px] tracking-widest uppercase mt-2">Tallest Spires + Strongest Signals</p>
       </div>

       <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto">
          {MOCK_LEADERBOARD.map((p, i) => (
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               key={i} 
               className="flex justify-between items-center p-4 mb-3 bg-[#08080c] border border-white/10"
             >
                <div className="flex items-center gap-4">
                   <div className="w-8 flex justify-center text-white/40 font-black text-[10px]">#{i + 1}</div>
                   <div className="font-mono text-[11px] text-[#00f2ff]">{p.addr}</div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[#ff00ff] font-bold text-[11px] tracking-widest">{p.score} SIG</span>
                   <span className="text-[10px] text-white/40 font-mono uppercase mt-1">{p.height}m</span>
                </div>
             </motion.div>
          ))}
       </div>
       
       <div className="py-4 text-center text-[9px] font-bold tracking-widest text-white/40 uppercase">
          Powered by Base Mainnet
       </div>
    </div>
  );
}
