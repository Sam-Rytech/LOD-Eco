'use client'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from 'wagmi/chains'

// 👇 Log it to confirm base is not undefined
console.log('Loaded chain:', base)

export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  networks: [base],
  ssr: true,
})
