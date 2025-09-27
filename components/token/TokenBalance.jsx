'use client'
import React, { useEffect, useState } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { getTokenBalance } from '../../lib/hooks'
import { formatUnits } from '../../lib/utils'

export default function TokenBalance() {
  const { address } = useAccount()
  const provider = useProvider()
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!provider || !address) return
      setLoading(true)
      try {
        const b = await getTokenBalance(provider, address)
        if (mounted) setBalance(b)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    load()
    return () => (mounted = false)
  }, [provider, address])

  return (
    <div>
      <h4 className="text-sm text-gray-600">Your LOD Balance</h4>
      <div className="mt-2 text-2xl font-semibold">
        {loading ? 'Loading...' : formatUnits(balance)}
      </div>
    </div>
  )
}
