import { createConfig } from 'wagmi'
import { http } from 'viem'
import { goerli, base, mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { walletConnect } from 'wagmi/connectors'

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || ''
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 8453)
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

// pick chain dynamically
const chain = [goerli, base, mainnet].find((c) => c.id === CHAIN_ID) || goerli

export default function createWagmiConfig() {
  return createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(RPC_URL),
    },
    connectors: [
      injected(),
      walletConnect({
        projectId: WC_PROJECT_ID,
        metadata: {
          name: 'LOD DApp',
          description: 'Lonrad Token DApp',
          url: 'https://example.com',
          icons: [],
        },
      }),
    ],
    ssr: true,
  })
}
