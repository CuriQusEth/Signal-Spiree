'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';

export default function SignalSpireCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const { isConnected } = useAccount();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {x:number, y:number, speed:number, color:string}[] = [];
    let playerY = 500;
    
    for(let i=0; i<50; i++){
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 1 + Math.random() * 3,
        color: ['#0ff', '#f0f', '#00f', '#eda020'][Math.floor(Math.random()*4)]
      });
    }

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Cyber-cosmic void
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render star/data particles falling down to create illusion of climbing
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.speed;
        if(p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * window.innerWidth;
        }
      });

      // Neon Signal Spire Center Structure
      ctx.strokeStyle = '#0ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Modules on the spire
      ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.fillRect(canvas.width/2 - 40, canvas.height/2, 80, 100);
      ctx.strokeStyle = '#f0f';
      ctx.strokeRect(canvas.width/2 - 40, canvas.height/2, 80, 100);

      // Draw player climbing
      playerY -= 0.5; // slow climb
      if(playerY < 0) playerY = canvas.height;
      setScore(s => s + 1);

      ctx.fillStyle = '#eda020';
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 20, playerY, 10, 0, Math.PI*2);
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 touch-none" />
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-start pointer-events-none">
        <div className="bg-black/50 border border-cyan-500/30 p-2 rounded tracking-widest text-[#0ff] font-['Cinzel'] pointer-events-auto">
          SIGNAL: {score.toLocaleString()} Hz
        </div>
        <div className="bg-black/50 border border-fuchsia-500/30 p-2 rounded text-fuchsia-400 text-xs pointer-events-auto">
          IONOSPHERE
        </div>
      </div>
    </div>
  );
}
