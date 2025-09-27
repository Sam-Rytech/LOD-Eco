'use client'

import ConnectButton from './ConnectButton'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="font-bold text-lg">Lonrad</div>
      <div className="flex space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/stake" className="hover:underline">
          Stake
        </a>
        <a href="/faucet" className="hover:underline">
          Faucet
        </a>
        <ConnectButton />
      </div>
    </nav>
  )
}
