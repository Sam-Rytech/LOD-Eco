import { ethers } from 'ethers'
import stakingAbi from '../abi/LODStaking.json'
import tokenAbi from '../abi/LonradToken.json'
import { appKit } from './wallet'
import { ADDRESSES } from './constants'

/**
 * Returns an ethers BrowserProvider bound to the walletconnect provider.
 */
export function getProvider() {
  // appKit.getProvider() returns the injected provider used by WalletConnect AppKit
  const provider = new ethers.BrowserProvider(appKit.getProvider())
  return provider
}

/**
 * Returns a signer for write calls. Caller should await getSigner() if needed.
 */
export async function getSigner() {
  const provider = getProvider()
  return provider.getSigner()
}

/**
 * Create contract instances (signerOrProvider can be omitted to use the current wallet provider).
 */
export function getContracts(signerOrProvider) {
  const node = signerOrProvider || getProvider()
  const staking = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, node)
  const token = new ethers.Contract(ADDRESSES.TOKEN, tokenAbi, node)
  return { staking, token }
}
