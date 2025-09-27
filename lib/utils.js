import { formatFixed, parseFixed } from 'ethers'

export function formatUnits(value, decimals = 18) {
  try {
    if (value === undefined || value === null) return '0'
    return formatFixed(value.toString(), decimals).toString()
  } catch (e) {
    return String(value)
  }
}

export function parseUnitsFriendly(amountStr, decimals = 18) {
  try {
    return parseFixed(amountStr || '0', decimals).toString()
  } catch (e) {
    throw e
  }
}
