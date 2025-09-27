'use client'
import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { unstakeTokens } from '../../lib/hooks'

export default function UnstakeForm() {
  const { data: signer } = useSigner()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState(null)

  const handleUnstake = async (e) => {
    e.preventDefault()
    if (!signer) return alert('Connect wallet')
    setLoading(true)
    try {
      const txHash = await unstakeTokens(signer, amount)
      setTx(txHash)
    } catch (e) {
      console.error(e)
      alert('Unstake failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleUnstake} className="space-y-3">
      <div>
        <label className="text-sm text-gray-600">Amount to unstake</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Unstaking...' : 'Unstake'}
      </button>
      {tx && <div className="text-sm mt-2">Tx: {tx}</div>}
    </form>
  )
}
