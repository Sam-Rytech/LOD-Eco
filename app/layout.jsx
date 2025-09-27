'use client'

import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import { appKit } from '../lib/wallet'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap app with AppKitProvider so hooks work */}
        <AppKitProvider appKit={appKit}>
          <Navbar />
          <main className="p-4">{children}</main>
        </AppKitProvider>
      </body>
    </html>
  )
}
