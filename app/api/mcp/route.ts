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
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Signal Spire MCP Endpoint",
    status: "active",
    description: "Active MCP server for Signal Spire Orchestrator Agent",
    capabilities: ["signal-detection", "spire-analysis", "multi-signal-orchestration", "mcp-command-execution"],
    timestamp: new Date().toISOString()
  }, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "Signal Spire Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400, headers: corsHeaders });
  }
}
