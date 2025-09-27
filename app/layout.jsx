'use client'

import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import BaseWalletManager from '../lib/BaseWalletManager' // Import the class
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'

// Create an instance
const walletManager = new BaseWalletManager()

export default function RootLayout({ children }) {
  const [appKitReady, setAppKitReady] = useState(false)

  useEffect(() => {
    async function initWallet() {
      try {
        await walletManager.initializeAppKit() // now works on the instance
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
      <body>
        <AppKitProvider appKit={walletManager.appKit}>
          <Navbar />
          <main>{children}</main>
        </AppKitProvider>
      </body>
    </html>
  )
}
