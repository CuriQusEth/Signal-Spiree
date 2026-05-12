# Signal Spire

Signal Spire is an atmospheric vertical climbing + tower-building endless game. You are a **Signal Warden**, constructing and climbing a massive neon signal spire that pierces the sky to connect with distant stars, ancient satellites, and lost civilizations. The higher you build and climb, the stronger the signal becomes — but the world becomes more unstable.

## Core Mechanics
- **Vertical Endless Climber:** Tap and climb your way upward.
- **Module Placement:** Place Signal Modules (Antennas, Amplifiers, Relays, Resonators) while climbing to extend the spire upward.
- **Structural Integrity:** Poor placements cause instability, reducing the tower's balance and safety layer by layer.
- **Signal Chains:** Strategically connected modules create powerful upward signal chains which multiply your score and abilities.

## Technical Details
This game is built with performance and modern web standards in mind:
- **Client:** React 19, TypeScript, Tailwind CSS, Vite, and HTML5 Canvas (`GameEngine`).
- **Blockchain Integration:** Wagmi, Viem, and Base Network for trustless gameplay logging, High Scores (SIWE), and ERC-8021 Transaction Attribution.
- **Agent Integration:** ERC-8004 Trustless Agents via the built-in MCP API endpoints in the Express server.

## Features
- Dynamic background parallax scrolling and environment layers (Ionosphere, Nebula Veil, Void Strata).
- Retro-neon Cyber-cosmic visual aesthetic with haptic feedbacks on compatible devices.
- Leaderboard & On-chain recording integration for verifying Spire height and Signal Strength.

## Quick Start Development
1. Clone the repository natively.
2. Install dependencies: `npm install`
3. Start the node server & development build: `npm run dev`
4. Deploy by exporting the `dist` folder, or use the `npm run start` script in production environments.
