'use client'

import { useState } from 'react'
import { walletManager } from '../lib/BaseWalletManager'
import { FAUCET_CONTRACT_ADDRESS } from '../lib/constants'
import faucetABI from '../abi/FaucetLOD.json'

export default function FaucetForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleClaim = async () => {
    setLoading(true)
    setMessage('Processing...')
    try {
      walletManager.initializeContract(FAUCET_CONTRACT_ADDRESS, faucetABI)
      const tx = await walletManager.writeContract('claim')
      setMessage(`Claim successful! Tx: ${tx.hash}`)
    } catch (err) {
      console.error(err)
      setMessage('Error claiming tokens')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <button
        onClick={handleClaim}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? 'Claiming...' : 'Claim LOD'}
      </button>
      {message && <p className="text-gray-700">{message}</p>}
    </div>
  )
}
