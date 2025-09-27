'use client'
import React, { useEffect, useState } from 'react'
import { useProvider, useAccount } from 'wagmi'
import { getPendingRewards } from '../../lib/hooks'
import { formatUnits } from '../../lib/utils'

export default function PendingRewards() {
  const provider = useProvider()
  const { address } = useAccount()
  const [pending, setPending] = useState('0')

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
    const t = setInterval(load, 15000)
    return () => {
      mounted = false
      clearInterval(t)
    }
  }, [provider, address])

  return (
    <div>
      <h4 className="text-sm text-gray-600">Pending Rewards</h4>
      <div className="mt-2 text-xl font-semibold">{formatUnits(pending)}</div>
    </div>
  )
}
