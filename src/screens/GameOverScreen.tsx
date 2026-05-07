import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useAccount, useSendTransaction } from 'wagmi';
import { buildOnChainData, generateAttributionPayload } from '../lib/erc8021';
import { parseEther } from 'viem';

export function GameOverScreen() {
  const { height, score, modulesPlaced, setScreen, resetGame } = useGameStore();
  const { isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleRetry = () => {
    resetGame();
    setScreen('GAME');
  };

  const handleRecordOnChain = async () => {
    if (!isConnected) {
      alert("Please connect Base Wallet first from Title Screen!");
      return;
    }
    
    // Create attribution + score payload
    const attr = generateAttributionPayload();
    const data = buildOnChainData(score, modulesPlaced);
    
    sendTransaction({
      to: '0x0000000000000000000000000000000000000000', // Mock contract address for standard Game
      value: parseEther('0'),
      data: data as any, // Simulating calldata with score and attribution
    }, {
      onSuccess: (hash) => {
         setTxHash(hash);
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff00ff]/20 via-[#050507] to-[#050507]"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 flex flex-col items-center w-full max-w-sm px-6"
      >
        <h2 className="text-5xl font-black tracking-tighter text-[#ff00ff] drop-shadow-[0_0_15px_rgba(255,0,255,0.8)] mb-2 uppercase">
          Signal Lost
        </h2>
        
        <div className="w-full bg-[#08080c] border border-white/10 p-6 flex flex-col gap-4 my-8 relative overflow-hidden">
           {/* Scanline effect */}
           <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.01)_3px,rgba(255,255,255,0.01)_3px)] pointer-events-none"></div>
           
           <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Spire Height</span>
              <span className="text-[#00f2ff] font-mono text-xl">{height}m</span>
           </div>
           <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Modules</span>
              <span className="text-white font-mono text-xl">{modulesPlaced}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Signal Score</span>
              <span className="text-[#ffcc00] font-mono font-bold text-2xl drop-shadow-[0_0_5px_rgba(255,204,0,0.8)]">{score}</span>
           </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <button 
            onClick={handleRecordOnChain}
            disabled={isPending || isSuccess}
            className={`w-full py-4 font-black tracking-widest text-[11px] uppercase transition-all ${
               isSuccess ? 'bg-[#00ff44] text-black border border-[#00ff44] hover:bg-white' 
               : 'bg-white/5 border border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black active:scale-95 shadow-[0_0_15px_rgba(255,0,255,0.2)]'
            }`}
          >
            {isPending ? 'Confirming...' : isSuccess ? 'Recorded on Base!' : 'Record Spire On-Chain'}
          </button>
          
          <button 
            onClick={handleRetry}
            className="w-full py-3 bg-[#00f2ff] text-black font-black tracking-widest text-[11px] uppercase hover:bg-white active:scale-95"
          >
            Climb Again
          </button>
          
          <button 
            onClick={() => setScreen('TITLE')}
            className="w-full py-2 bg-transparent text-white/40 font-bold text-[10px] tracking-widest uppercase hover:text-white"
          >
            Return to Title
          </button>
        </div>
      </motion.div>
    </div>
  );
}
