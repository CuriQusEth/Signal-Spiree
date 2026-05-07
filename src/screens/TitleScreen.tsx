import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function TitleScreen() {
  const { setScreen } = useGameStore();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050507]">
      {/* Background visual effects */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#ff00ff]/10 via-[#0a0a0f] to-[#050507]"></div>
        <div className="absolute left-1/2 bottom-0 w-1 md:w-2 h-full bg-[#00f2ff]/10 shadow-[0_0_50px_10px_rgba(0,242,255,0.2)] transform -translate-x-1/2"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ff] to-[#ffcc00] mb-2 uppercase">
            Signal Spire
          </h1>
          <p className="mt-4 text-[#00f2ff] font-bold text-[10px] tracking-widest uppercase">
            Ascend. Connect. Survive.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full flex flex-col gap-4"
        >
          <button 
            onClick={() => setScreen('GAME')}
            className="w-full py-4 bg-[#00f2ff] text-black font-black text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:bg-white active:scale-95"
          >
            Ascend Spire
          </button>
          
          <button 
             onClick={handleConnect}
             className="w-full py-3 border border-white/10 bg-white/5 text-white font-bold text-[11px] tracking-widest uppercase transition-all hover:bg-white/10 active:scale-95 flex items-center justify-center"
          >
             {isConnected ? `Disconnect (${address?.slice(0,6)}...${address?.slice(-4)})` : 'Connect Base Wallet'}
          </button>
          
          <button 
             onClick={() => setScreen('LEADERBOARD')}
             className="w-full py-3 border border-white/5 bg-transparent text-white/40 font-bold text-[10px] tracking-widest uppercase transition-all hover:bg-white/5 hover:text-white active:scale-95"
          >
             View Leaderboard
          </button>
        </motion.div>

        <motion.div 
           className="mt-16 text-center"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5 }}
        >
            <p className="text-white/30 font-bold tracking-widest text-[9px] uppercase">BUILDER_CODE: bc_1edsp91c</p>
        </motion.div>
      </div>
    </div>
  );
}
