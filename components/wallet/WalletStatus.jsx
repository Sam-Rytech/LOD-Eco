'use client'
import React from 'react'
import { useAccount } from 'wagmi'

export default function WalletStatus() {
  const { address, isConnected } = useAccount()
  if (!isConnected)
    return <div className="text-sm text-gray-500">Not connected</div>
  return <div className="text-sm text-green-600">Connected: {address}</div>
}
