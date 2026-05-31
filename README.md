# 🗼 Signal Spire

**Signal Spire Orchestrator** is an atmospheric, mobile-first vertical climbing and tower-building endless game on the **Base Mainnet**. 

You are a **Signal Warden**, constructing and climbing a massive neon signal spire that pierces the sky to connect with distant stars, ancient satellites, and lost civilizations. The higher you build and climb, the stronger the signal becomes — but the world becomes more unstable.

## 🎮 Core Gameplay Mechanics
- **Vertical Endless Climber:** Tap to jump, climb, and ascend through various atmospheric layers.
- **Module Placement:** Strategically place Signal Modules to extend the spire.
- **Structural Integrity:** Poor placements cause instability—modules must be placed in balanced patterns or the spire sways and breaks.
- **Signal Chains:** Perfectly aligned modules create powerful upward signal chains, generating massive score multipliers.

## 🔗 On-Chain & Web3 Features
Built natively for the **Base ecosystem**:
- **ERC-8021 Transaction Attribution:** Full integration for transaction tracking and builder attribution.
- **ERC-8004 Trustless Agents:** Built-in protocol compatibility allowing autonomous AI agents to interact with the game state.
- **SIWE Integration:** Sign-In With Ethereum for secure, trustless score submission.
- **Hybrid Leaderboard:** Tracks both the tallest physical spires and the strongest digital signals on-chain.

## 🤖 Orchestrator Agent (MCP)
Signal Spire runs an integrated **ERC-8004 AI Agent** ("Signal Spire Orchestrator") which actively monitors the game state.

### Capabilities & Skills
- **Signal Detection:** Detects signals and anomalies in the spire.
- **Spire Analysis:** Analyzes the structural integrity and stability of the spire.
- **Multi-Signal Orchestration:** Manages and orchestrates multiple signal streams simultaneously.
- **Opportunity Management:** Identifies and manages intelligent opportunities based on predictive analytics.

### Agent Registration & Endpoints
- **Agent Card (A2A Discovery):** `https://signal-spiree.vercel.app/.well-known/agent-card.json`
- **Agent Main API:** `https://signal-spiree.vercel.app/api/agent`
- **MCP Protocol Endpoint:** `https://signal-spiree.vercel.app/api/mcp`

### MCP Connection Guide
The MCP Server supports `initialize`, `tools/list`, and `tools/call` JSON-RPC 2.0 requests over HTTP.
To interact with the MCP route, send a raw JSON-RPC POST request:
```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_race_status",
    "arguments": {}
  }
}
```

## 🛠️ Tech Stack & Architecture
- **Frontend Layer:** React 19, TypeScript, Vite, Tailwind CSS
- **Game Engine:** Custom high-performance HTML5 Canvas renderer
- **Blockchain Layer:** Wagmi + Viem
- **API Architecture:** Next.js App Router format (`app/api/`)

## 🚀 Local Setup & Quick Start
1. Clone the repository natively.
2. Install dependencies: `npm install`
3. Setup `.env` (Use `.env.example` as a template. Do NOT commit private keys).
4. Run locally: `npm run dev` (Runs on `http://localhost:3000`)
5. **Deployment:** The project is configured for deployment to platforms supporting standard Next.js or Node-based API handlers.
