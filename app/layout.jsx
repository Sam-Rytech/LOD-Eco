'use client'

import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import { appKit } from '../lib/wallet'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppKitProvider appKit={appKit}>
          <Navbar />
          <main>{children}</main>
        </AppKitProvider>
      </body>
    </html>
  )
}
