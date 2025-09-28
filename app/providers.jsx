'use client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit'
import { wagmiAdapter } from '@/lib/wagmiConfig'

const queryClient = new QueryClient()

// Initialize Reown AppKit once (attaches <w3m-button /> globally)
createAppKit({
  adapters: [wagmiAdapter],
  metadata: {
    name: 'LOD DApp',
    description: 'Lonrad Token DApp',
    url: 'https://lod-dapp.example',
    icons: ['/logo.svg'],
  },
})

export function Providers({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
