import React, { useRef, useEffect } from 'react';
import { GameEngine } from '../GameEngine';

interface CanvasRendererProps {
  isPaused: boolean;
  onGameOver: (height: number, score: number, modules: number) => void;
  onUpdateStats: (height: number, score: number, modules: number) => void;
}

export function CanvasRenderer({ isPaused, onGameOver, onUpdateStats }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Initialize Engine
    const engine = new GameEngine(canvasRef.current, {
      onGameOver,
      onUpdateStats
    });
    engineRef.current = engine;

    // Handle Resize
    const handleResize = () => {
      engine.resize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // initial
    
    engine.start();

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.destroy();
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      if (isPaused) {
        engineRef.current.pause();
      } else {
        engineRef.current.resume();
      }
    }
  }, [isPaused]);

  const handleInteract = (e: React.PointerEvent) => {
     if (engineRef.current && !isPaused) {
         engineRef.current.handleInteract();
     }
  };

  return (
    <div 
       ref={containerRef} 
       className="w-full h-full relative"
       onPointerDown={handleInteract}
    >
      <canvas 
        ref={canvasRef} 
        className="block touch-none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
