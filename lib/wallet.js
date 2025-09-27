// lib/wallet.js
import { createAppKit } from '@reown/appkit'
import { ethersAdapter } from '@reown/appkit-adapter-ethers'

const projectId = 'f579285fe2d1f128b9a30434426c3a6b'

const metadata = {
  name: 'Lonrad DApp',
  description: 'Staking & Faucet for LOD',
  url: 'http://localhost:3000',
  icons: ['http://localhost:3000/logo.png'],
}

export const appKit = createAppKit({
  adapters: [ethersAdapter()],
  projectId,
  metadata,
  chains: [
    {
      id: 84532, // Base Sepolia
      name: 'Base Sepolia',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://sepolia.base.org'],
    },
    {
      id: 8453, // Base Mainnet
      name: 'Base',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.base.org'],
    },
  ],
})
