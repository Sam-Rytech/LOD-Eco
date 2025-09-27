'use client'

import { useState } from 'react'
import { walletManager } from '../lib/BaseWalletManager'
import { STAKING_CONTRACT_ADDRESS } from '../lib/constants'
import stakingABI from '../abi/LODStaking.json'

export default function StakeForm() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleStake = async () => {
    if (!amount || isNaN(amount)) return
    setLoading(true)
    setMessage('Processing...')
    try {
      walletManager.initializeContract(STAKING_CONTRACT_ADDRESS, stakingABI)
      const tx = await walletManager.writeContract('stake', [amount])
      setMessage(`Staked successfully! Tx: ${tx.hash}`)
      setAmount('')
    } catch (err) {
      console.error(err)
      setMessage('Error staking tokens')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <input
        type="number"
        placeholder="Amount to stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleStake}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Staking...' : 'Stake'}
      </button>
      {message && <p className="text-gray-700">{message}</p>}
    </div>
  )
}
