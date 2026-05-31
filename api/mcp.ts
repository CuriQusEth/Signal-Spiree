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
    return res.status(200).json({ status: "MCP Server Active. Use POST for JSON-RPC." });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};

      if (body.jsonrpc !== "2.0") {
        return res.status(400).json({ jsonrpc: "2.0", id: body.id, error: { code: -32600, message: "Invalid Request" } });
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
                text: `Executed tool: ${body.params?.name}`
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
          return res.status(404).json({ jsonrpc: "2.0", id: body.id, error: { code: -32601, message: "Method not found" } });
      }

      return res.status(200).json({
        jsonrpc: "2.0",
        id: body.id,
        result: result
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP JSON-RPC request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
