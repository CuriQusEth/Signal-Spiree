import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(
    {
      status: "MCP Server Active. Use POST for JSON-RPC.",
      network: "Base Mainnet (Denim)",
      blockTime: "200ms",
      endpoint: "/api/mcp"
    },
    { headers: corsHeaders }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.jsonrpc !== "2.0") {
      return NextResponse.json(
        { jsonrpc: "2.0", id: body.id, error: { code: -32600, message: "Invalid Request" } },
        { status: 400, headers: corsHeaders }
      );
    }

    let result: unknown = null;

    switch (body.method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: {
            name: "Signal Spire Orchestrator",
            version: "1.0.0",
            network: "Base Mainnet (Denim 200ms)"
          }
        };
        break;

      case "tools/list":
        result = {
          tools: [
            {
              name: "get_network_status",
              description: "Get Base Mainnet status, verifying Denim 200ms canonical blocks and RPC health.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_spire_status",
              description: "Get the current Signal Spire height, signal frequency, and structural integrity.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "detect_signals",
              description: "Detect cosmic signals, frequency anomalies, and distant celestial broadcasts.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "optimize_signal",
              description: "Tune spire resonators and amplifiers for maximal transmission power.",
              inputSchema: {
                type: "object",
                properties: {
                  targetFrequency: { type: "number", description: "Target frequency in MHz" }
                }
              }
            },
            {
              name: "get_leaderboard",
              description: "Get top Signal Wardens on Base Mainnet.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_race_status",
              description: "Legacy tool: Get current race/ascent status.",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        };
        break;

      case "tools/call": {
        const toolName = body.params?.name;
        let responseContent = `Executed tool: ${toolName}`;

        if (toolName === "get_network_status") {
          responseContent = JSON.stringify({
            chain: "Base Mainnet",
            chainId: 8453,
            upgrade: "Denim",
            blockTime: "200ms canonical",
            flashblocks: "retired",
            rpc: "https://mainnet.base.org",
            status: "active_and_synced"
          });
        } else if (toolName === "get_spire_status") {
          responseContent = JSON.stringify({
            spireHeight: "1,420m",
            structuralIntegrity: "96.4%",
            signalPower: "142.8 GHz",
            currentLayer: "Ionosphere",
            connectedRelays: 12
          });
        } else if (toolName === "detect_signals") {
          responseContent = JSON.stringify({
            detectedSignals: [
              { frequency: "1420.405 MHz", source: "Hydrogen Line Beacon", strength: "94%" },
              { frequency: "845.300 MHz", source: "Base Denim Sync Pulse", strength: "99%" },
              { frequency: "2140.000 MHz", source: "Deep Space Resonator", strength: "78%" }
            ]
          });
        } else if (toolName === "optimize_signal") {
          responseContent = JSON.stringify({
            status: "optimized",
            efficiencyBoost: "+24%",
            resonanceLocked: true,
            networkBlock: "200ms Denim synced"
          });
        } else if (toolName === "get_leaderboard") {
          responseContent = JSON.stringify([
            { rank: 1, warden: "0x2953...9b7B", height: "4,820m", score: "89,450" },
            { rank: 2, warden: "0xcD0d...71a3", height: "3,950m", score: "72,100" },
            { rank: 3, warden: "0x742d...44e8", height: "3,110m", score: "58,300" }
          ]);
        }

        result = {
          content: [
            {
              type: "text",
              text: responseContent
            }
          ]
        };
        break;
      }

      case "prompts/list":
        result = { prompts: [] };
        break;

      case "resources/list":
        result = { resources: [] };
        break;

      default:
        return NextResponse.json(
          { jsonrpc: "2.0", id: body.id, error: { code: -32601, message: "Method not found" } },
          { status: 404, headers: corsHeaders }
        );
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id: body.id,
      result: result
    }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: "Invalid MCP JSON-RPC request" }, { status: 400, headers: corsHeaders });
  }
}
