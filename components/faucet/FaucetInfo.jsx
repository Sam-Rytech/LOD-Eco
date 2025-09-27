'use client'
import React, { useEffect, useState } from 'react'
import { useProvider } from 'wagmi'
import { fetchFaucetInfoWithProvider } from '../../lib/hooks'
import { formatUnits } from '../../lib/utils'

export default function FaucetInfo() {
  const provider = useProvider()
  const [info, setInfo] = useState({ dripAmount: '0', cooldown: '0' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const i = await fetchFaucetInfoWithProvider(provider)
        if (mounted) setInfo(i)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    load()
    return () => (mounted = false)
  }, [provider])

  return (
    <div>
      <h4 className="text-sm text-gray-600">Faucet</h4>
      <div className="mt-2">
        <div>
          Drip amount:{' '}
          <strong>
            {loading ? 'Loading...' : formatUnits(info.dripAmount || '0')}
          </strong>
        </div>
        <div>
          Cooldown: <strong>{loading ? '-' : info.cooldown + ' sec'}</strong>
        </div>
      </div>
    </div>
  )
}
