'use client'
import React from 'react'
import { ConnectButton as ReownConnect } from '@reown/appkit/react'

export default function ConnectButton() {
  // Reown AppKit's ConnectButton handles wallet selection (WalletConnect, MetaMask, etc.)
  return (
    <div>
      <ReownConnect />
    </div>
  )
}
