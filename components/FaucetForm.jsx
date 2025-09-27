'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { appKit } from '../lib/wallet'
import { getContracts, getSigner } from '../lib/contract'

export default function FaucetForm() {
  const [user, setUser] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const sub = appKit.subscribe(({ address }) => {
      setUser(address ?? null)
    })
    return () => sub?.unsubscribe()
  }, [])

  async function handleClaim() {
    if (!user) return alert('Connect wallet first')
    setBusy(true)
    try {
      const signer = await getSigner()
      const { faucet } = getContracts(signer) // faucet must be added to contract.js if ABI available
      const tx = await faucet.claim()
      await tx.wait()
      alert('Faucet tokens claimed!')
    } catch (e) {
      console.error(e)
      alert('Faucet claim failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="p-6 bg-gray-800 rounded-md text-white">
      <h3 className="text-xl font-semibold mb-4">Claim LOD from Faucet</h3>
      <p className="mb-4">
        Get free test LOD tokens to use in staking and exploring the ecosystem.
      </p>
      <button
        onClick={handleClaim}
        disabled={busy}
        className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
      >
        {busy ? 'Claiming...' : 'Claim Tokens'}
      </button>
    </div>
  )
}
