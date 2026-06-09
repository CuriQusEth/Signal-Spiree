'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Sun, RadioReceiver, ShieldAlert, Cpu } from 'lucide-react';
import SignalSpireCanvas from '@/components/game/SignalSpireCanvas';

export default function SignalSpireEntry() {
  const [inGame, setInGame] = useState(false);
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isPending } = useSendTransaction();

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: BigInt(0),
      data: '0x474d' // "GM" in hex
    });
  };

  if (inGame) {
    return (
      <div className="relative w-full h-screen">
        <SignalSpireCanvas />
        {/* Persistent bottom UI */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <button 
            className="pointer-events-auto bg-black/60 border border-fuchsia-500/50 p-3 rounded-full text-fuchsia-400 hover:bg-fuchsia-900/40"
            onClick={() => setInGame(false)}
          >
            <ShieldAlert size={24} />
          </button>

          {isConnected && (
            <button
              onClick={sendGMTransaction}
              disabled={isPending}
              className="pointer-events-auto px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
            >
              <Sun size={16} />
              {isPending ? 'TRANSMITTING...' : 'SAY GM'}
            </button>
          )}

          <button className="pointer-events-auto bg-black/60 border border-cyan-500/50 p-3 rounded-full text-cyan-400 hover:bg-cyan-900/40">
            <Cpu size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-cyan-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glowing details */}
      <div className="absolute top-1/4 max-w-full blur-3xl opacity-20 pointer-events-none">
        <div className="w-[300px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen" />
        <div className="w-[400px] h-[400px] bg-fuchsia-800 rounded-full absolute -top-10 -left-20 mix-blend-screen" />
      </div>

      <div className="z-10 text-center flex flex-col items-center max-w-md w-full gap-8">
        <div className="flex flex-col items-center">
          <RadioReceiver size={64} className="text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]" />
          <h1 className="text-5xl font-['Cinzel'] tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-[#0ff] drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            SIGNAL SPIRE
          </h1>
          <p className="mt-4 text-cyan-400/80 tracking-widest text-sm font-['JetBrains_Mono'] uppercase">
            Ascend. Construct. Connect.
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 mt-8">
          <button
            onClick={() => setInGame(true)}
            className="w-full py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-['Cinzel'] font-bold tracking-widest text-lg hover:bg-cyan-950/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all uppercase"
          >
            Ascend The Spire
          </button>
          
          <div className="flex flex-col gap-2 mt-4">
            {isConnected ? (
                <>
                  <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-white/50 bg-white/5 p-3 rounded">
                      <span>Warden: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                      <button onClick={() => disconnect()} className="hover:text-red-400">Disconnect</button>
                  </div>
                </>
            ) : (
                <button
                onClick={() => connect({ connector: injected() })}
                className="w-full py-3 bg-white/5 border border-white/10 text-white/60 text-sm tracking-widest hover:bg-white/10 transition-colors uppercase font-['JetBrains_Mono']"
                >
                Connect Wallet (SIWE)
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
