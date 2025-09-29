// lib/web3.js
import { ethers } from 'ethers'
import { getWalletClient } from '@reown/appkit/react'

/**
 * Returns an ethers.js provider connected to Base Mainnet
 */
export function getProvider() {
  return new ethers.JsonRpcProvider('https://mainnet.base.org') // Base mainnet RPC
}

/**
 * Returns the connected signer from WalletConnect (via appkit)
 */
export async function getSigner() {
  const walletClient = await getWalletClient()
  if (!walletClient) throw new Error('No wallet connected')

  return new ethers.BrowserProvider(walletClient).getSigner()
}

/**
 * Get contract instance
 * @param {string} address - Deployed contract address
 * @param {object} abi - Contract ABI JSON
 * @param {boolean} withSigner - Use signer for write tx
 */
export async function getContract(address, abi, withSigner = false) {
  const provider = getProvider()
  if (withSigner) {
    const signer = await getSigner()
    return new ethers.Contract(address, abi, signer)
  }
  return new ethers.Contract(address, abi, provider)
}
