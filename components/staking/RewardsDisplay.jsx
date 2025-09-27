'use client'
import React, { useEffect, useState } from 'react'
import { useProvider, useAccount, useSigner } from 'wagmi'
import { claimRewards, getPendingRewards } from '../../lib/hooks'
import { formatUnits } from '../../lib/utils'

export default function RewardsDisplay() {
  const provider = useProvider()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [pending, setPending] = useState('0')
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!provider || !address) return
      try {
        const p = await getPendingRewards(provider, address)
        if (mounted) setPending(p)
      } catch (e) {
        console.error(e)
      }
    }
    load()
    return () => (mounted = false)
  }, [provider, address])

  const handleClaim = async () => {
    if (!signer) return alert('Connect wallet')
    setLoading(true)
    try {
      const txHash = await claimRewards(signer)
      setTx(txHash)
      const p = await getPendingRewards(provider, address)
      setPending(p)
    } catch (e) {
      console.error(e)
      alert('Claim failed')
    }
    setLoading(false)
  }

  return (
    <div>
      <h4 className="text-sm text-gray-600">Pending Rewards</h4>
      <div className="mt-2 text-lg font-medium">{formatUnits(pending)}</div>
      <div className="mt-3">
        <button
          onClick={handleClaim}
          className="px-3 py-2 bg-amber-600 text-white rounded"
          disabled={loading || pending === '0'}
        >
          {loading ? 'Claiming...' : 'Claim Rewards'}
        </button>
      </div>
      {tx && <div className="text-sm mt-2">Tx: {tx}</div>}
    </div>
  )
}
