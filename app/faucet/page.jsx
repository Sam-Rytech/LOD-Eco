'use client'
import React from 'react'
import FaucetButton from '../../components/faucet/FaucetButton'
import FaucetInfo from '../../components/faucet/FaucetInfo'
import FaucetFundForm from '../../components/faucet/FaucetFundForm'

export default function FaucetPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Faucet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <FaucetInfo />
          <div className="mt-4">
            <FaucetButton />
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <FaucetFundForm />
        </div>
      </div>
    </div>
  )
}
