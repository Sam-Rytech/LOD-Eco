'use client'
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi'

export default function useWalletState() {
  const account = useAccount()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const signer = useSigner()

  return {
    account,
    connect,
    disconnect,
    signer,
  }
}
