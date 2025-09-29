// lib/contracts/faucet.js
import FaucetABI from '../abis/FaucetLOD.json'
import { getContract } from '../web3'

const FAUCET_ADDRESS = process.env.NEXT_PUBLIC_FAUCET_ADDRESS

async function faucetContract(withSigner = false) {
  return await getContract(FAUCET_ADDRESS, FaucetABI, withSigner)
}

export async function claimFaucet() {
  const contract = await faucetContract(true)
  const tx = await contract.claim()
  return await tx.wait()
}

export async function getLastClaimed(user) {
  const contract = await faucetContract()
  return await contract.lastClaimed(user)
}

export async function getDripAmount() {
  const contract = await faucetContract()
  return await contract.dripAmount()
}

export async function getCooldownTime() {
  const contract = await faucetContract()
  return await contract.cooldownTime()
}
