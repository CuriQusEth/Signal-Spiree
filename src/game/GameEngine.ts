export interface GameEngineCallbacks {
  onGameOver: (height: number, score: number, modules: number) => void;
  onUpdateStats: (height: number, score: number, modules: number) => void;
}

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: 'base' | 'placed' | 'moving';
  direction?: number; // 1 or -1
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private reqId: number = 0;
  private cbs: GameEngineCallbacks;
  private isPaused: boolean = false;
  
  private width: number = 0;
  private height: number = 0;
  private blockHeight: number = 40;
  
  private blocks: Block[] = [];
  private currentBlock: Block | null = null;
  
  private cameraY: number = 0;
  private score: number = 0;
  private perfectChain: number = 0;
  private lastPulseY: number | null = null;
  private pulseSize: number = 0;
  
  private targetCameraY: number = 0;
  private speed: number = 3;
  private maxScore: number = 0;
  
  // Visual effects
  private particles: any[] = [];
  private bgStars: any[] = [];
  private layerColor1: string = '#050510';
  private layerColor2: string = '#0f172a';
  
  constructor(canvas: HTMLCanvasElement, cbs: GameEngineCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.cbs = cbs;
    this.initGame();
  }
  
  public resize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.canvas.width = w * window.devicePixelRatio;
    this.canvas.height = h * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // adjust base if needed
    if (this.blocks.length === 0) {
      this.initGame();
    } else {
       this.blocks[0].x = w / 2 - this.blocks[0].width / 2;
       this.blocks[0].y = h - this.blockHeight - 100;
    }
    
    if (this.bgStars.length === 0) {
       for(let i=0; i<100; i++){
          this.bgStars.push({
             x: Math.random() * w,
             y: Math.random() * h,
             size: Math.random() * 2,
             speed: Math.random() * 0.5 + 0.1
          });
       }
    }
  }
  
  private initGame() {
    this.score = 0;
    this.perfectChain = 0;
    this.lastPulseY = null;
    this.pulseSize = 0;
    this.cameraY = 0;
    this.targetCameraY = 0;
    this.speed = 3;
    
    const baseWidth = Math.min(200, this.width * 0.6);
    const startY = this.height - this.blockHeight - 100;
    
    this.blocks = [
      {
        x: (this.width / 2) - (baseWidth / 2),
        y: startY,
        width: baseWidth,
        height: this.blockHeight * 5, // make base tall
        color: '#00f2ff', // sharp cyan
        type: 'base'
      }
    ];
    
    this.spawnNextBlock();
  }
  
  private spawnNextBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    
    // speed increases slightly
    if (this.score > 0 && this.score % 5 === 0) {
       this.speed += 0.5;
    }
    
    const colors = ['#00f2ff', '#ff00ff', '#00f2ff', '#ffcc00', '#ffffff']; // cyan, fuchsia, cyan, yellow, white
    const col = colors[this.score % colors.length];
    
    this.currentBlock = {
      x: 0,
       // The new block is placed exactly blockHeight above the lastBlock
      y: lastBlock.type === 'base' ? lastBlock.y - this.blockHeight : lastBlock.y - this.blockHeight,
      width: lastBlock.width,
      height: this.blockHeight,
      color: col,
      type: 'moving',
      direction: 1
    };
    
    this.targetCameraY = (this.blocks.length - 2) * this.blockHeight;
  }
  
  public handleInteract() {
    if (this.isPaused || !this.currentBlock) return;
    
    const b = this.currentBlock;
    const last = this.blocks[this.blocks.length - 1];
    
    // Check overlap
    const bRight = b.x + b.width;
    const lastRight = last.x + last.width;
    
    const overlapStart = Math.max(b.x, last.x);
    const overlapEnd = Math.min(bRight, lastRight);
    const overlap = overlapEnd - overlapStart;
    
    if (overlap <= 0) {
      // missed entirely
      this.gameOver();
      return;
    }
    
    // Chop block
    const isPerfect = Math.abs(b.x - last.x) < 5;
    
    if (isPerfect) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
      b.x = last.x;
      b.width = last.width;
      this.score += 20; // Bonus for perfect
      this.perfectChain += 1;
      this.createParticles(b.x + b.width/2, b.y, b.color, 40); // bigger explosion
      
      if (this.perfectChain >= 3) {
          // Trigger signal pulse
          this.lastPulseY = b.y;
          this.pulseSize = 10;
          this.score += 50; // extra bonus
          this.perfectChain = 0; // reset
      }
    } else {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
      b.x = overlapStart;
      b.width = overlap;
      this.score += 10;
      this.perfectChain = 0;
      this.createParticles(b.x + b.width/2, b.y, '#ffffff', 15);
    }
    
    b.type = 'placed';
    this.blocks.push(b);
    
    this.cbs.onUpdateStats((this.blocks.length - 1) * 10, this.score, this.blocks.length - 1);
    
    this.currentBlock = null;
    this.spawnNextBlock();
  }
  
  private gameOver() {
    this.isPaused = true;
    this.cbs.onGameOver((this.blocks.length - 1) * 10, this.score, this.blocks.length - 1);
  }
  
  private createParticles(x: number, y: number, color: string, count: number) {
      for(let i=0; i<count; i++){
          this.particles.push({
              x, y,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              life: 1.0,
              color
          });
      }
  }
  
  public start() {
    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      this.update(dt);
      this.draw();
      this.reqId = requestAnimationFrame(loop);
    };
    this.reqId = requestAnimationFrame(loop);
  }
  
  public pause() {
    this.isPaused = true;
  }
  
  public resume() {
    this.isPaused = false;
  }
  
  public destroy() {
    cancelAnimationFrame(this.reqId);
  }
  
  private update(dt: number) {
    if (this.isPaused) return;
    
    // Update camera smoothly
    this.cameraY += (this.targetCameraY - this.cameraY) * 0.1;
    
    const maxH = this.blocks.length;
    // Layer logic
    if (maxH < 15) {
       this.layerColor1 = '#050507'; // Ionosphere
    } else if (maxH < 35) {
       this.layerColor1 = '#0a0a0f'; // Nebula
    } else {
       this.layerColor1 = '#000000'; // Void
    }

    // Update stars
    this.bgStars.forEach(s => {
       s.y += s.speed;
       if(s.y > this.height) {
           s.y = 0;
           s.x = Math.random() * this.width;
       }
    });

    // Update Pulse
    if (this.lastPulseY !== null) {
        this.lastPulseY -= this.speed * 3; // fast pulse moving up
        this.pulseSize += 5;
        if (this.lastPulseY < -this.cameraY - 1000) {
           this.lastPulseY = null;
        }
    }

    // Update current block
    if (this.currentBlock) {
      this.currentBlock.x += this.speed * this.currentBlock.direction! * (dt/16);
      if (this.currentBlock.x + this.currentBlock.width > this.width) {
        this.currentBlock.x = this.width - this.currentBlock.width;
        this.currentBlock.direction = -1;
      }
      if (this.currentBlock.x < 0) {
        this.currentBlock.x = 0;
        this.currentBlock.direction = 1;
      }
    }
    
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) this.particles.splice(i, 1);
    }
  }
  
  private draw() {
    // Fill background
    this.ctx.fillStyle = this.layerColor1;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw stars
    this.ctx.fillStyle = '#ffffff';
    this.bgStars.forEach(s => {
        this.ctx.globalAlpha = s.size / 2;
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        this.ctx.fill();
    });
    this.ctx.globalAlpha = 1.0;
    
    this.ctx.save();
    // Apply camera shift
    this.ctx.translate(0, this.cameraY);
    
    // Draw base beam
    if (this.blocks.length > 0) {
       const base = this.blocks[0];
       const gradient = this.ctx.createLinearGradient(0, base.y, 0, -this.cameraY);
       gradient.addColorStop(0, 'rgba(0, 242, 255, 0.2)');
       gradient.addColorStop(1, 'rgba(0, 242, 255, 0.0)');
       this.ctx.fillStyle = gradient;
       this.ctx.fillRect(base.x + base.width/2 - 10, -Math.abs(this.cameraY) - 500, 20, base.y + 1000);
    }

    // Draw blocks
    for (const b of this.blocks) {
      this.drawNeonRect(b.x, b.y, b.width, b.height, b.color, true);
    }
    
    // Draw moving block
    if (this.currentBlock) {
      this.drawNeonRect(this.currentBlock.x, this.currentBlock.y, this.currentBlock.width, this.currentBlock.height, this.currentBlock.color, false);
    }
    
    // Draw Signal Pulse
    if (this.lastPulseY !== null) {
       this.ctx.beginPath();
       this.ctx.strokeStyle = '#ff00ff'; // neon fuchsia
       this.ctx.lineWidth = 10;
       this.ctx.shadowBlur = 30;
       this.ctx.shadowColor = '#ff00ff';
       
       const cX = this.width / 2;
       
       this.ctx.moveTo(cX - this.pulseSize, this.lastPulseY + this.pulseSize);
       this.ctx.lineTo(cX, this.lastPulseY);
       this.ctx.lineTo(cX + this.pulseSize, this.lastPulseY + this.pulseSize);
       
       this.ctx.stroke();
       this.ctx.shadowBlur = 0;
    }
    
    // Draw particles
    this.particles.forEach(p => {
        this.ctx.globalAlpha = p.life;
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x, p.y, 4, 4);
    });
    this.ctx.globalAlpha = 1.0;
    
    this.ctx.restore();
  }
  
  private drawNeonRect(x: number, y: number, w: number, h: number, color: string, isPlaced: boolean) {
     this.ctx.shadowBlur = 10;
     this.ctx.shadowColor = color;
     this.ctx.fillStyle = isPlaced ? 'rgba(255,255,255,0.05)' : color;
     this.ctx.fillRect(x, y, w, h);
     
     this.ctx.strokeStyle = color;
     this.ctx.lineWidth = 1;
     this.ctx.strokeRect(x, y, w, h);
     
     this.ctx.shadowBlur = 0;
     
     // add some tech details
     if (isPlaced) {
         this.ctx.fillStyle = '#08080c'; // dark dark core
         this.ctx.fillRect(x + 5, y + 5, w - 10, h - 10); 
         
         // data lines
         this.ctx.fillStyle = color;
         this.ctx.globalAlpha = 0.5;
         this.ctx.fillRect(x + 10, y + h/2 - 1, w - 20, 2);
         this.ctx.globalAlpha = 1.0;
     } else {
         this.ctx.fillStyle = '#000000';
         this.ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
         this.ctx.fillStyle = color;
         this.ctx.fillRect(x + 10, y + h/2 - 1, w - 20, 2);
     }
  }
}
