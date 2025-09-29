// lib/web3.js
import { ethers } from 'ethers'

/**
 * Returns a connected ethers.js provider
 * Uses browser-injected wallet (wagmi/appkit handles connection)
 */
export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  throw new Error(
    'No crypto wallet found. Please install MetaMask or use WalletConnect.'
  )
}

/**
 * Returns a signer for transactions
 */
export async function getSigner() {
  const provider = getProvider()
  return await provider.getSigner()
}

/**
 * Creates a contract instance (read/write)
 * @param {string} address - Contract address
 * @param {object} abi - Contract ABI
 * @param {boolean} withSigner - If true, return a contract with signer for txs
 */
export async function getContract(address, abi, withSigner = false) {
  const provider = getProvider()
  if (withSigner) {
    const signer = await provider.getSigner()
    return new ethers.Contract(address, abi, signer)
  }
  return new ethers.Contract(address, abi, provider)
}
