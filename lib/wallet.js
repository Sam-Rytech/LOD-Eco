'use client'

import { createAppKit } from '@reown/appkit/react'
import { ethersAdapter } from '@reown/appkit-adapter-ethers'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

const metadata = {
  name: 'FaucetLOD',
  description: 'Staking + Faucet dApp',
  url: 'http://localhost:3000',
  icons: ['http://localhost:3000/logo.svg'],
}

export const appKit = createAppKit({
  adapters: [ethersAdapter()],
  projectId,
  metadata,
  chains: [
    {
      id: 8453,
      name: 'Base',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.base.org'],
    },
  ],
})
