import type { VercelRequest, VercelResponse } from '@vercel/node';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Signal Spire Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Signal Spire",
      version: "1.0.0"
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      return res.status(200).json({
        status: "received",
        agent: "Signal Spire Orchestrator",
        action: body
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid agent request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
