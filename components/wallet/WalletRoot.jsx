'use client'
import React from 'react'
import { WalletProvider } from '../../app/providers'
import useWalletState from '../../lib/walletState'
import ConnectButton from './ConnectButton'

export default function WalletRoot({ children }) {
  const walletState = useWalletState()

  return (
    <WalletProvider value={walletState}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end py-2">
          <ConnectButton />
        </div>
      </div>
      {children}
    </WalletProvider>
  )
}
