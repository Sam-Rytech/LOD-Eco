export const LOD_ADDRESS = process.env.NEXT_PUBLIC_LOD_ADDRESS || ''
export const FAUCET_ADDRESS = process.env.NEXT_PUBLIC_FAUCET_ADDRESS || ''
export const STAKING_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS || ''
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || ''
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
  ? Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  : 8453
