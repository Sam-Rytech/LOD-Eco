'use client'

import { useState } from 'react'
import { walletManager } from '../lib/BaseWalletManager'

export default function ConnectButton() {
  const [address, setAddress] = useState(null)

  const handleConnect = async () => {
    try {
      await walletManager.openModal()
      const account = await walletManager.getAccount()
      if (account.isConnected) setAddress(account.address)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold"
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}
