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
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Signal Spire",
    version: "1.0.0"
  }, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    // Basic POST to align with typical agent actions
    const body = await req.json();
    return NextResponse.json({
      status: "received",
      agent: "Signal Spire Orchestrator",
      action: body
    }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Invalid agent request" }, { status: 400, headers: corsHeaders });
  }
}
