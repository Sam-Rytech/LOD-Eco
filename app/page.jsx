'use client'
import React from 'react'
import Link from 'next/link'
import ConnectButton from '../../components/wallet/ConnectButton'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome to LOD DApp</h2>
          <p className="text-gray-600">
            Interact with the Lonrad token, faucet, and staking contracts.
          </p>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/token" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold">Token</h3>
            <p className="text-sm text-gray-500">
              View balance, transfer tokens.
            </p>
          </div>
        </Link>

        <Link href="/faucet" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold">Faucet</h3>
            <p className="text-sm text-gray-500">
              Claim test tokens from the faucet.
            </p>
          </div>
        </Link>

        <Link href="/stake" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold">Staking</h3>
            <p className="text-sm text-gray-500">Stake LOD and earn rewards.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
