# 🗼 Signal Spire

**Signal Spire Orchestrator** is an atmospheric, mobile-first vertical climbing and tower-building endless game deployed natively on **Base Mainnet (Denim Upgrade)**. 

You are a **Signal Warden**, constructing and climbing a massive neon signal spire that pierces the sky to connect with distant stars, ancient satellites, and lost civilizations. The higher you build and climb, the stronger the signal becomes — but the world becomes more unstable.

## ⚡ Base Denim Mainnet Migration (200ms Native Blocks)
Base migrated to the **Denim Upgrade**, introducing native 200ms canonical blocks:
- **Canonical Block Time:** 200ms native canonical blocks (Zero Flashblocks).
- **Fast Finality:** Wagmi/Viem RPC queries and receipt confirmations tuned to 200ms intervals.
- **RPC Endpoint:** `https://mainnet.base.org` / `wss://mainnet.base.org`
- **Chain ID:** `8453` (Base Mainnet)
- **Status:** All legacy Flashblock subscriptions and `"pending"` tags have been completely retired in favor of canonical 200ms block inclusion.

## 🎮 Core Gameplay Mechanics
- **Vertical Endless Climber:** Tap to jump, climb, and ascend through various atmospheric layers.
- **Module Placement:** Strategically place Signal Modules to extend the spire.
- **Structural Integrity:** Poor placements cause instability—modules must be placed in balanced patterns or the spire sways and breaks.
- **Signal Chains:** Perfectly aligned modules create powerful upward signal chains, generating massive score multipliers.

## 🔗 On-Chain & Web3 Features
Built natively for the **Base ecosystem**:
- **Base Mainnet (Denim):** 200ms block-speed transaction confirmations.
- **"Say GM" Button:** Direct on-chain interaction with contract `0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3`.
- **ERC-8021 Transaction Attribution:** Full integration for transaction tracking and builder attribution (`BUILDER_CODE: bc_1edsp91c`).
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
- **Base Denim Monitoring:** Tracks canonical 200ms block performance.

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
    "name": "get_network_status",
    "arguments": {}
  }
}
```

## 🛠️ Tech Stack & Architecture
- **Frontend Layer:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Game Engine:** Custom high-performance HTML5 Canvas renderer
- **Blockchain Layer:** Wagmi + Viem tuned for Base Denim 200ms blocks
- **API Architecture:** Next.js App Router format (`app/api/`)

## 🚀 Local Setup & Quick Start
1. Clone the repository natively.
2. Install dependencies: `npm install`
3. Setup `.env` (Use `.env.example` as a template).
4. Run locally: `npm run dev` (Runs on `http://localhost:3000`)
5. Build for production: `npm run build`
