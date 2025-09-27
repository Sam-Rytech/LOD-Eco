'use client'
import React from 'react'
import TokenBalance from '../../components/token/TokenBalance'
import TransferForm from '../../components/token/TransferForm'

export default function TokenPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Token</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <TokenBalance />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <TransferForm />
        </div>
      </div>
    </div>
  )
}
