'use client'
import React from 'react'
import StakeForm from '../../components/staking/StakeForm'
import UnstakeForm from '../../components/staking/UnstakeForm'
import RewardsDisplay from '../../components/staking/RewardsDisplay'

export default function StakePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Staking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <StakeForm />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <UnstakeForm />
          <div className="mt-4">
            <RewardsDisplay />
          </div>
        </div>
      </div>
    </div>
  )
}
