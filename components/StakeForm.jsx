'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  stakeTokens,
  withdrawTokens,
  withdrawAllTokens,
  claimRewards,
  getPendingRewards,
  getUserStake,
  getAPR,
} from '@/lib/contracts/staking';
import { getBalance, getAllowance, approve, getDecimals } from '@/lib/contracts/token';
import { ethers } from 'ethers';

export default function StakeForm() {
  const { address, isConnected } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [apr, setApr] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!address) return;
      try {
        const [bal, stakeInfo, reward, aprVal, dec] = await Promise.all([
          getBalance(address),
          getUserStake(address),
          getPendingRewards(address),
          getAPR(),
          getDecimals(),
        ]);
        setBalance(bal);
        setStaked(stakeInfo.amount);
        setRewards(reward);
        setApr(Number(aprVal) / 100); // APR in %
        setDecimals(Number(dec));
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [address]);

  const handleStake = async () => {
    try {
      setLoading(true);
      const amount = ethers.parseUnits(stakeAmount, decimals);
      // Check allowance
      const allowance = await getAllowance(address, process.env.NEXT_PUBLIC_STAKING_ADDRESS);
      if (allowance < amount) {
        const txApprove = await approve(process.env.NEXT_PUBLIC_STAKING_ADDRESS, amount);
        await txApprove;
      }
      const tx = await stakeTokens(amount);
      await tx;
    } catch (err) {
      console.error(err);
      alert(err.message || 'Stake failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const amount = ethers.parseUnits(stakeAmount, decimals);
      const tx = await withdrawTokens(amount);
      await tx;
    } catch (err) {
      console.error(err);
      alert(err.message || 'Withdraw failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawAll = async () => {
    try {
      setLoading(true);
      const tx = await withdrawAllTokens();
      await tx;
    } catch (err) {
      console.error(err);
      alert(err.message || 'Withdraw all failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    try {
      setLoading(true);
      const tx = await claimRewards();
      await tx;
    } catch (err) {
      console.error(err);
      alert(err.message || 'Claim rewards failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return <p className="text-center text-gray-400">Connect wallet to stake</p>;
  }

  return (
    <div className="max-w-md p-6 mx-auto bg-white shadow-md rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">Staking</h2>
      <p className="mb-2">Your balance: {ethers.formatUnits(balance, decimals)} LOD</p>
      <p className="mb-2">Staked: {ethers.formatUnits(staked, decimals)} LOD</p>
      <p className="mb-2">Rewards: {ethers.formatUnits(rewards, decimals)} LOD</p>
      <p className="mb-2">APR: {apr}%</p>

      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        className="w-full px-3 py-2 mb-3 border rounded-lg"
        placeholder="Amount to stake/withdraw"
      />

      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={loading}
          onClick={handleStake}
        >
          Stake
        </button>
        <button
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          disabled={loading}
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>

      <button
        className="w-full px-4 py-2 mb-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
        disabled={loading}
        onClick={handleWithdrawAll}
      >
        Withdraw All
      </button>

      <button
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
        onClick={handleClaimRewards}
      >
        Claim Rewards
      </button>
    </div>
  );
}
