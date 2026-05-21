# 🗼 Signal Spire

**Signal Spire** is an atmospheric, mobile-first vertical climbing and tower-building endless game on the **Base Mainnet**. 

You are a **Signal Warden**, constructing and climbing a massive neon signal spire that pierces the sky to connect with distant stars, ancient satellites, and lost civilizations. The higher you build and climb, the stronger the signal becomes — but the world becomes more unstable.

## 🎮 Core Gameplay Mechanics
- **Vertical Endless Climber:** Tap to jump, climb, and ascend through various atmospheric layers (Ionosphere, Nebula Veil, Void Strata).
- **Module Placement:** Strategically place Signal Modules (Antennas, Amplifiers, Relays, Resonators) to extend the spire.
- **Structural Integrity:** Poor placements cause instability—modules must be placed in balanced patterns or the spire sways and breaks.
- **Signal Chains:** Perfectly aligned modules create powerful upward signal chains, generating massive score multipliers and triggering "Signal Pulses".
- **Dynamic Challenges:** Face increasing wind shear, complex physics, and the ultimate high-risk "Collapse Mode" when structural integrity drops.

## 🔗 On-Chain & Web3 Features
Built natively for the **Base ecosystem**:
- **ERC-8021 Transaction Attribution:** Full integration for transaction tracking and builder attribution.
- **ERC-8004 Trustless Agents:** Built-in protocol compatibility allowing autonomous AI agents to interact with the game state.
- **SIWE Integration:** Sign-In With Ethereum for secure, trustless score submission.
- **Hybrid Leaderboard:** Tracks both the tallest physical spires and the strongest digital signals on-chain.

## 🤖 Orchestrator Agent (MCP)
Signal Spire runs an integrated **ERC-8004 AI Agent** ("Signal Spire Orchestrator") which actively monitors the game state.
- **Capabilities:** signal-detection, spire-analysis, multi-signal-orchestration, opportunity-management, real-time-monitoring, predictive-analytics, mcp-command-execution.
- **Agent API:** Available at `[PLACEHOLDER_APP_URL]/api/agent`
- **MCP Protocol Endpoint:** Available at `[PLACEHOLDER_APP_URL]/api/mcp` for active command execution via the Model Context Protocol.
- **Agent Card:** Served at `[PLACEHOLDER_APP_URL]/.well-known/agent-card.json` for A2A discovery.

### Protocol Connections
- The MCP endpoint uses standard JSON over HTTP for agent interactions.
- Send valid `POST` requests directly to the MCP route for orchestrated actions.

## 🛠️ Stack & Architecture
- **Frontend Layer:** React 19, TypeScript, Vite, Tailwind CSS (Mobile-first, PWA ready)
- **Game Engine:** Custom high-performance HTML5 Canvas renderer
- **Blockchain Layer:** Wagmi + Viem
- **API Architecture:** Next.js App Router format (`app/api/`)

## 🚀 Quick Start
1. Clone the repository natively.
2. Install dependencies: `npm install`
3. Setup `.env` (Use `.env.example` as a template. Do NOT commit private keys).
4. Run locally: `npm run dev` (Runs on `http://localhost:3000`)
5. **Deployment:** Refer to your platform's documentation for deploying generic API functions or Next-native applications.
