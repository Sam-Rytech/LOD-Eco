'use client'
import { useEffect, useState } from 'react'
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit/react'

export default function ConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()

  return (
    <button
      onClick={() => open()}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {isConnected && address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}
