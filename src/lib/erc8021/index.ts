// ERC-8021 Transaction Attribution implementation
// Using base network attribution guidelines

export const BUILDER_CODE = 'bc_1edsp91c';
export const ATTRIBUTION_CODE = 'ATTRIBUTION_CODE';

export interface AttributionData {
  builder: string;
  campaign?: string;
  source?: string;
}

export function generateAttributionPayload(data: Partial<AttributionData> = {}) {
  return {
    builder: data.builder || BUILDER_CODE,
    campaign: data.campaign || 'signal-spire-launch',
    source: data.source || 'web-app',
    timestamp: Date.now(),
  };
}

export function buildOnChainData(score: number, modules: number) {
  // Simulating an encoded payload for the smart contract that includes attribution
  console.log(`[ERC-8021] Packing data with builder code: ${BUILDER_CODE}`);
  return `0x000${score.toString(16)}000${modules.toString(16)}`;
}
