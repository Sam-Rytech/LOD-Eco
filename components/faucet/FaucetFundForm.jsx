'use client'
import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { fundFaucet } from '../../lib/hooks'

export default function FaucetFundForm() {
  const { data: signer } = useSigner()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState(null)

  const handleFund = async (e) => {
    e.preventDefault()
    if (!signer) return alert('Connect')
    setLoading(true)
    try {
      const txHash = await fundFaucet(signer, amount)
      setTx(txHash)
    } catch (e) {
      console.error(e)
      alert('Funding failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleFund} className="space-y-3">
      <div>
        <label className="text-sm text-gray-600">Amount</label>
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
        {loading ? 'Funding...' : 'Fund Faucet'}
      </button>
      {tx && <div className="text-sm mt-2">Tx: {tx}</div>}
    </form>
  )
}
