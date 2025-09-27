'use client'
import { useEffect, useState } from 'react'
import { appKit } from '../lib/wallet'

export default function ConnectButton() {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const sub = appKit.subscribe((session) => {
      setAddress(session.address ?? null)
    })
    // read initial if connected
    const init = appKit.getAccount?.()
    if (init && init.address) setAddress(init.address)
    return () => sub?.unsubscribe()
  }, [])

  return (
    <button
      onClick={() => appKit.open()}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}
