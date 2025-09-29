// lib/contracts/faucet.js
import FaucetABI from '../abis/FaucetLOD.json'
import TokenABI from '../abis/LonradToken.json'
import { getContract } from '../web3'

// ⚠️ Replace these with your deployed addresses
const FAUCET_ADDRESS = '0x8e5771f587d626ac68e962d0582Ed717074567ab'
const TOKEN_ADDRESS = '0xE48A480171E6877a4632c3d588DeC89AAE002800'

export async function getFaucetContract(withSigner = false) {
  return getContract(FAUCET_ADDRESS, FaucetABI, withSigner)
}

export async function getTokenContract(withSigner = false) {
  return getContract(TOKEN_ADDRESS, TokenABI, withSigner)
}

/**
 * Claim tokens from faucet
 */
export async function claimFaucet() {
  const faucet = await getFaucetContract(true)
  const tx = await faucet.claim()
  return tx.wait()
}

/**
 * Fund faucet
 */
export async function fundFaucet(amount) {
  const token = await getTokenContract(true)
  const tx = await token.transfer(FAUCET_ADDRESS, amount)
  return tx.wait()
}
