import './globals.css'
import React from 'react'
import WalletRoot from '../components/wallet/WalletRoot'

export const metadata = {
  title: 'LOD DApp',
  description: 'Lonrad Token + Faucet + Staking UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WalletRoot>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.svg" alt="logo" className="w-10 h-10" />
                  <h1 className="text-lg font-semibold">LOD DApp</h1>
                </div>
                <div>{/* Connect UI is rendered inside WalletRoot */}</div>
              </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-1">
              {children}
            </main>

            <footer className="bg-white border-t py-4">
              <div className="container mx-auto px-4 text-sm text-gray-600">
                Built with ❤️ for LOD
              </div>
            </footer>
          </div>
        </WalletRoot>
      </body>
    </html>
  )
}
