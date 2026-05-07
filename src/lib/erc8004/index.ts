// ERC-8004 Trustless Agents interface

export interface AgentConfig {
  agentId: string;
  permissions: string[];
  maxGas: bigint;
}

export function registerAgentForSpire(address: string, config: AgentConfig) {
  console.log(`[ERC-8004] Registering agent ${config.agentId} for address ${address}`);
  // In a real app we would call the contract to grant this agent permissions
  return true;
}

export function delegateClimbToAgent(agentId: string, maxLevels: number) {
  console.log(`[ERC-8004] Agent ${agentId} is authorized to climb up to ${maxLevels} levels automatically`);
}
