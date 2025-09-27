'use client'
import React from 'react'
import TokenBalance from '../../components/token/TokenBalance'
import FaucetInfo from '../../components/faucet/FaucetInfo'
import PendingRewards from '../../components/staking/PendingRewards'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <TokenBalance />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <FaucetInfo />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <PendingRewards />
        </div>
      </div>
    </div>
  )
}
