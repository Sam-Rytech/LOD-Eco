'use client'
import Link from 'next/link'
import ConnectButton from '../components/ConnectButton'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Lonrad (LOD)</h1>
      <p className="mb-6 max-w-2xl">
        Lonrad Token (LOD) powers our staking and faucet ecosystem. Stake LOD to
        earn fixed APR rewards or claim tokens from the faucet to get started.
      </p>

      <div className="flex gap-4 mb-6">
        <Link
          href="/stake"
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-700"
        >
          Go to Staking
        </Link>
        <Link
          href="/faucet"
          className="px-6 py-3 bg-yellow-500 rounded hover:bg-yellow-600"
        >
          Go to Faucet
        </Link>
      </div>

      <ConnectButton />
    </main>
  )
}
