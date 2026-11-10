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
    name: "Signal Spire Orchestrator",
    status: "active",
    network: "Base Mainnet (Denim)",
    chainId: 8453,
    blockTime: "200ms",
    executionModel: "canonical-200ms-blocks",
    flashblocks: "retired_migrated_to_denim",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Signal Spire",
    version: "1.0.0",
    rpc: "https://mainnet.base.org",
    lastUpdated: new Date().toISOString()
  }, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "received",
      agent: "Signal Spire Orchestrator",
      network: "Base Mainnet (Denim 200ms)",
      action: body,
      timestamp: new Date().toISOString()
    }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Invalid agent request" }, { status: 400, headers: corsHeaders });
  }
}
