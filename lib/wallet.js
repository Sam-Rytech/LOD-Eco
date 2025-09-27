'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

const projectId = 'f579285fe2d1f128b9a30434426c3a6b'

const metadata = {
  name: 'FaucetLOD',
  description: 'Staking + Faucet dApp',
  url: 'http://localhost:3000',
  icons: ['http://localhost:3000/logo.svg'],
}

const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  projectId,
  metadata,
  networks: [
    {
      id: 'eip155:8453',
      chainId: 8453,
      name: 'Base',
      currency: 'ETH',
      explorerUrl: 'https://basescan.org',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]
})

export { appKit }