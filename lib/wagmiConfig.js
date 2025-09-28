'use client'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from 'wagmi/chains'

// WagmiAdapter bridges WalletConnect ↔ wagmi
export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  networks: [base],
  ssr: true,
})
