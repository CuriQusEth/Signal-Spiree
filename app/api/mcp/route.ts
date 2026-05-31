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
    { status: "MCP Server Active. Use POST for JSON-RPC." },
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

    let result = null;

    switch (body.method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: {
            name: "Signal Spire Orchestrator",
            version: "1.0.0"
          }
        };
        break;

      case "tools/list":
        result = {
          tools: [
            {
              name: "get_race_status",
              description: "Get the current race status.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "start_race",
              description: "Start a new race.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_leaderboard",
              description: "Get the race leaderboard.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "optimize_speed",
              description: "Optimize vehicle speed.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_track_info",
              description: "Retrieve track information.",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        };
        break;

      case "tools/call":
        result = {
          content: [
            {
              type: "text",
              text: `Executed tool: ${body.params.name}`
            }
          ]
        };
        break;

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
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP JSON-RPC request" }, { status: 400, headers: corsHeaders });
  }
}
