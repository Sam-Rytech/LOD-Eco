'use client'

import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { walletManager } from '../lib/BaseWalletManager'

export default function RootLayout({ children }) {
  useEffect(() => {
    walletManager.initializeAppKit()
  }, [])

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
