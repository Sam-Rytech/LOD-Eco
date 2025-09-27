'use client'

import { useEffect, useState } from 'react'
import { walletManager } from '../lib/BaseWalletManager'
import ConnectButton from '../components/ConnectButton'
import { STAKING_CONTRACT_ADDRESS, LOD_TOKEN_ADDRESS } from '../lib/constants'
import stakingABI from '../abi/LODStaking.json'

export default function HomePage() {
  const [totalStaked, setTotalStaked] = useState('0')

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        walletManager.initializeContract(STAKING_CONTRACT_ADDRESS, stakingABI)
        const total = await walletManager.readContract('totalStaked')
        setTotalStaked(total.toString())
      } catch (error) {
        console.error(error)
      }
    }

    fetchTotalStaked()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lonrad Ecosystem (LOD)</h1>
        <ConnectButton />
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Total Staked LOD</h2>
        <p className="text-gray-700">{totalStaked}</p>
      </div>
    </div>
  )
}
