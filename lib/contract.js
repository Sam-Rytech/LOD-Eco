import { Contract } from 'ethers'
import TokenABI from '../abi/LonradToken.json'
import FaucetABI from '../abi/FaucetLOD.json'
import StakingABI from '../abi/LODStaking.json'
import { LOD_ADDRESS, FAUCET_ADDRESS, STAKING_ADDRESS } from './addresses'

export function tokenContract(signerOrProvider) {
  return new Contract(LOD_ADDRESS, TokenABI, signerOrProvider)
}

export function faucetContract(signerOrProvider) {
  return new Contract(FAUCET_ADDRESS, FaucetABI, signerOrProvider)
}

export function stakingContract(signerOrProvider) {
  return new Contract(STAKING_ADDRESS, StakingABI, signerOrProvider)
}
