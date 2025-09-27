'use client'
import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { claimFromFaucet } from '../../lib/hooks'

export default function FaucetButton() {
  const { data: signer } = useSigner()
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState(null)

  const handleClaim = async () => {
    if (!signer) return alert('Connect wallet')
    setLoading(true)
    try {
      const txHash = await claimFromFaucet(signer)
      setTx(txHash)
    } catch (e) {
      console.error(e)
      alert('Claim failed')
    }
    setLoading(false)
  }

  return (
    <div>
      <button
        onClick={handleClaim}
        className="px-4 py-2 bg-green-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Claiming...' : 'Claim from Faucet'}
      </button>
      {tx && <div className="mt-2 text-sm">Tx: {tx}</div>}
    </div>
  )
}
