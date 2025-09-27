'use client'
import React from 'react'
import ConnectButton from './ConnectButton'
import WalletStatus from './WalletStatus'

export default function WalletRoot() {
  return (
    <div className="flex items-center gap-4">
      <WalletStatus />
      <ConnectButton />
    </div>
  )
}
