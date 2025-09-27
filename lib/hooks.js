import { tokenContract, faucetContract, stakingContract } from './contract'
import { parseUnitsFriendly } from './utils'

// token read
export async function getTokenBalance(providerOrSigner, account) {
  if (!providerOrSigner || !account) return '0'
  const token = tokenContract(providerOrSigner)
  const b = await token.balanceOf(account)
  return b.toString()
}

// token transfer (write)
export async function transferTokens(signer, to, amountStr) {
  if (!signer) throw new Error('No signer')
  const token = tokenContract(signer)
  const amount = parseUnitsFriendly(amountStr || '0')
  const tx = await token.transfer(to, amount)
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

// Faucet read info
export async function fetchFaucetInfoWithProvider(provider) {
  if (!provider) return { dripAmount: '0', cooldown: '0' }
  const faucet = faucetContract(provider)
  const drip = await faucet.dripAmount()
  const cooldown = await faucet.cooldownTime()
  return { dripAmount: drip.toString(), cooldown: cooldown.toString() }
}

// claim faucet
export async function claimFromFaucet(signer) {
  if (!signer) throw new Error('No signer')
  const faucet = faucetContract(signer)
  const tx = await faucet.claim()
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

// fund faucet (approve + faucet.fund)
export async function fundFaucet(signer, amountStr) {
  if (!signer) throw new Error('No signer')
  const token = tokenContract(signer)
  const faucet = faucetContract(signer)
  const amount = parseUnitsFriendly(amountStr || '0')
  const approveTx = await token.approve(faucet.address, amount)
  await approveTx.wait()
  const tx = await faucet.fund(amount)
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

// staking
export async function stakeTokens(signer, amountStr) {
  if (!signer) throw new Error('No signer')
  const staking = stakingContract(signer)
  const amount = parseUnitsFriendly(amountStr || '0')
  const tx = await staking.stake(amount)
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

export async function unstakeTokens(signer, amountStr) {
  if (!signer) throw new Error('No signer')
  const staking = stakingContract(signer)
  const amount = parseUnitsFriendly(amountStr || '0')
  const tx = await staking.withdraw(amount)
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

export async function claimRewards(signer) {
  if (!signer) throw new Error('No signer')
  const staking = stakingContract(signer)
  const tx = await staking.claimRewards()
  const receipt = await tx.wait()
  return receipt.transactionHash || tx.hash
}

export async function getPendingRewards(providerOrSigner, account) {
  if (!providerOrSigner || !account) return '0'
  const staking = stakingContract(providerOrSigner)
  const p = await staking.pendingRewards(account)
  return p.toString()
}
