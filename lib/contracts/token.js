import TokenABI from '../abis/LonradToken.json'
import { getContract } from '../web3'

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS

async function tokenContract(withSigner = false) {
  return await getContract(TOKEN_ADDRESS, TokenABI, withSigner)
}

export async function getBalance(user) {
  const contract = await tokenContract()
  return await contract.balanceOf(user)
}

export async function getAllowance(owner, spender) {
  const contract = await tokenContract()
  return await contract.allowance(owner, spender)
}

export async function approve(spender, amount) {
  const contract = await tokenContract(true)
  const tx = await contract.approve(spender, amount)
  return await tx.wait()
}

export async function getTotalSupply() {
  const contract = await tokenContract()
  return await contract.totalSupply()
}

export async function getDecimals() {
  const contract = await tokenContract()
  return await contract.decimals()
}
