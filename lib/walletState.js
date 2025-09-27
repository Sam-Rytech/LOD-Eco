'use client'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useConnectorClient,
} from 'wagmi'

export default function useWalletState() {
  const account = useAccount()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const { data: client } = useConnectorClient()

  return {
    account,
    connect,
    disconnect,
    signer: client, // client acts as signer-like
  }
}
