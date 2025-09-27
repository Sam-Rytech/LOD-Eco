'use client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { appKit } from '../lib/wallet'
import { getContracts, getSigner, getProvider } from '../lib/contract'
import { ADDRESSES } from '../lib/constants'

export default function StakeForm() {
  const [amount, setAmount] = useState('')
  const [user, setUser] = useState(null)
  const [staked, setStaked] = useState('0.0')
  const [pending, setPending] = useState('0.0')
  const [allowance, setAllowance] = useState('0.0')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const sub = appKit.subscribe(({ address }) => {
      setUser(address ?? null)
      if (address) refresh(address)
    })
    return () => sub?.unsubscribe()
  }, [])

  async function refresh(address) {
    try {
      const provider = getProvider()
      const signer = await provider.getSigner()
      const { staking, token } = getContracts(signer)

      // stakes mapping returns struct (amount, since) — adjust if ABI differs
      const stakeInfo = await staking.stakes(address)
      const stakedAmount = stakeInfo[0] ?? stakeInfo.amount ?? 0n
      const pendingRaw = await staking.pendingRewards(address)
      const allowanceRaw = await token.allowance(address, ADDRESSES.STAKING)

      setStaked(ethers.formatUnits(stakedAmount.toString(), 18))
      setPending(ethers.formatUnits(pendingRaw.toString(), 18))
      setAllowance(ethers.formatUnits(allowanceRaw.toString(), 18))
    } catch (err) {
      console.error('refresh error', err)
    }
  }

  async function handleApprove() {
    if (!user) return alert('Connect wallet first')
    if (!amount || Number(amount) <= 0) return alert('Enter an amount')

    setBusy(true)
    try {
      const signer = await getSigner()
      const { token } = getContracts(signer)
      const amt = ethers.parseUnits(amount || '0', 18)
      const tx = await token.approve(ADDRESSES.STAKING, amt)
      await tx.wait()
      alert('Approved')
      await refresh(user)
    } catch (e) {
      console.error(e)
      alert('Approve failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleStake() {
    if (!user) return alert('Connect wallet first')
    if (!amount || Number(amount) <= 0) return alert('Enter an amount')

    setBusy(true)
    try {
      const signer = await getSigner()
      const { staking, token } = getContracts(signer)
      const amt = ethers.parseUnits(amount || '0', 18)

      // check allowance
      const currentAllowance = await token.allowance(user, ADDRESSES.STAKING)
      if (currentAllowance < amt) {
        alert('Please approve first (insufficient allowance)')
        setBusy(false)
        return
      }

      const tx = await staking.stake(amt)
      await tx.wait()
      alert('Staked!')
      setAmount('')
      await refresh(user)
    } catch (e) {
      console.error(e)
      alert('Stake failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleClaim() {
    if (!user) return alert('Connect wallet first')
    setBusy(true)
    try {
      const signer = await getSigner()
      const { staking } = getContracts(signer)
      const tx = await staking.claimRewards()
      await tx.wait()
      alert('Rewards claimed')
      await refresh(user)
    } catch (e) {
      console.error(e)
      alert('Claim failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleWithdrawAll() {
    if (!user) return alert('Connect wallet first')
    setBusy(true)
    try {
      const signer = await getSigner()
      const { staking } = getContracts(signer)
      const tx = await staking.withdrawAll()
      await tx.wait()
      alert('Withdrawn all')
      await refresh(user)
    } catch (e) {
      console.error(e)
      alert('Withdraw failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="p-6 bg-gray-800 rounded-md text-white max-w-xl">
      <h3 className="text-xl font-semibold mb-3">Stake LOD</h3>

      <div className="mb-2">
        Connected: {user ? `${user.slice(0, 6)}...${user.slice(-4)}` : 'No'}
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          Staked: <strong>{staked}</strong> LOD
        </div>
        <div>
          Pending: <strong>{pending}</strong> LOD
        </div>
      </div>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to stake (LOD)"
        className="w-full p-2 rounded bg-gray-700 text-white mb-3"
        type="number"
        step="0.0001"
      />

      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          disabled={busy}
          className="px-3 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
        >
          Approve
        </button>

        <button
          onClick={handleStake}
          disabled={busy}
          className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Stake
        </button>

        <button
          onClick={handleClaim}
          disabled={busy}
          className="px-3 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Claim Rewards
        </button>

        <button
          onClick={handleWithdrawAll}
          disabled={busy}
          className="px-3 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Withdraw All
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-300">
        Allowance: {allowance} LOD
      </div>
    </div>
  )
}
