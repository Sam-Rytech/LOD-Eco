'use client'
import ConnectButton from '../../components/ConnectButton'
import FaucetForm from '../../components/FaucetForm'

export default function FaucetPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <nav className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">Lonrad Faucet</div>
        <ConnectButton />
      </nav>

      <section className="max-w-2xl mx-auto">
        <FaucetForm />
      </section>
    </main>
  )
}
