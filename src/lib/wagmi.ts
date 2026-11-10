import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Base Mainnet with Denim Upgrade specifications
// Denim replaces Flashblocks with native 200ms canonical blocks
export const baseDenim = {
  ...base,
  name: 'Base Mainnet (Denim)',
  blockTime: 200, // 200ms canonical blocks
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
    public: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
  },
} as const;

export const wagmiConfig = createConfig({
  chains: [baseDenim],
  connectors: [
    injected(),
  ],
  transports: {
    [baseDenim.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
  pollingInterval: 200, // Tuned for Denim 200ms canonical blocks
});
