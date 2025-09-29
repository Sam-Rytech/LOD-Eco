// app/_appkit/provider.jsx
'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppKitProvider } from '@reown/appkit/react'
import { walletConnect, injected } from 'wagmi/connectors'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      metadata: {
        name: 'Lonrad DApp',
        description: 'Faucet & Staking for Lonrad Token',
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-url.com',
        icons: [],
      },
    }),
  ],
  transports: {
    [base.id]: http(
      process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'
    ),
  },
  ssr: true, // for Next.js server-side rendering
})

export default function Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider>{children}</AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
