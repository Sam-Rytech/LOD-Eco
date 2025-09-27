'use client'
import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { stakeTokens } from '../../lib/hooks'

export default function StakeForm() {
  const { data: signer } = useSigner()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState(null)

  const handleStake = async (e) => {
    e.preventDefault()
    if (!signer) return alert('Connect')
    setLoading(true)
    try {
      const txHash = await stakeTokens(signer, amount)
      setTx(txHash)
    } catch (e) {
      console.error(e)
      alert('Stake failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleStake} className="space-y-3">
      <div>
        <label className="text-sm text-gray-600">Amount to stake</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        className="px-4 py-2 bg-sky-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Staking...' : 'Stake'}
      </button>
      {tx && <div className="text-sm mt-2">Tx: {tx}</div>}
    </form>
  )
}
