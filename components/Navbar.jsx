'use client'
import Link from 'next/link'
import ConnectButton from './ConnectButton'

export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Lonrad</div>
      <nav className="flex gap-4">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link href="/stake" className="hover:text-blue-400">
          Stake
        </Link>
        <Link href="/faucet" className="hover:text-blue-400">
          Faucet
        </Link>
      </nav>
      <ConnectButton />
    </header>
  )
}
