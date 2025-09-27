'use client'
import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { transferTokens } from '../../lib/hooks'

export default function TransferForm() {
  const { data: signer } = useSigner()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!signer) return alert('Connect first')
    setLoading(true)
    try {
      const tx = await transferTokens(signer, to, amount)
      setTxHash(tx)
    } catch (err) {
      console.error(err)
      alert('Transfer failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600">To</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <button
          className="px-4 py-2 bg-sky-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      {txHash && <div className="text-sm text-gray-600">Tx: {txHash}</div>}
    </form>
  )
}
