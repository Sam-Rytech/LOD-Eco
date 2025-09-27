'use client'

import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import BaseWalletManager from '../lib/BaseWalletManager'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'

const walletManager = new BaseWalletManager()

export default function RootLayout({ children }) {
  const [appKitReady, setAppKitReady] = useState(false)

  useEffect(() => {
    async function initWallet() {
      try {
        await walletManager.initializeAppKit()
        setAppKitReady(true)
      } catch (err) {
        console.error('Failed to initialize AppKit', err)
      }
    }

    initWallet()
  }, [])

  if (!appKitReady) return <div>Loading wallet...</div>

  return (
    <html lang="en">
      <head />
      <body>
        <AppKitProvider appKit={walletManager.appKit}>
          <Navbar />
          <main>{children}</main>
        </AppKitProvider>
      </body>
    </html>
  )
}
