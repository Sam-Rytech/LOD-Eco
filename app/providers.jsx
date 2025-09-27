'use client'
import React, { createContext, useContext } from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import createWagmiConfig from '../lib/wagmiConfig'

const WalletContext = createContext(null)

export function WalletProvider({ children, value }) {
  const wagmiConfig = createWagmiConfig()
  const queryClient = new QueryClient()

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletContext.Provider value={value}>
          {children}
        </WalletContext.Provider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}
