// lib/contracts/staking.js
import StakingABI from '../abis/LODStaking.json'
import { getContract } from '../web3'

const STAKING_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS

async function stakingContract(withSigner = false) {
  return await getContract(STAKING_ADDRESS, StakingABI, withSigner)
}

export async function stakeTokens(amount) {
  const contract = await stakingContract(true)
  const tx = await contract.stake(amount)
  return await tx.wait()
}

export async function withdrawTokens(amount) {
  const contract = await stakingContract(true)
  const tx = await contract.withdraw(amount)
  return await tx.wait()
}

export async function withdrawAllTokens() {
  const contract = await stakingContract(true)
  const tx = await contract.withdrawAll()
  return await tx.wait()
}

export async function claimRewards() {
  const contract = await stakingContract(true)
  const tx = await contract.claimRewards()
  return await tx.wait()
}

export async function getPendingRewards(user) {
  const contract = await stakingContract()
  return await contract.pendingRewards(user)
}

export async function getUserStake(user) {
  const contract = await stakingContract()
  return await contract.stakes(user)
}

export async function getAPR() {
  const contract = await stakingContract()
  return await contract.apr()
}
