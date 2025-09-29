// components/StakeForm.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  stake,
  withdraw,
  claimRewards,
  pendingRewards,
} from '../lib/contracts/staking';
import { useAppKit } from '@reown/appkit/react';

export default function StakeForm() {
  const { address, isConnected } = useAppKit();
  const [amount, setAmount] = useState('');
  const [rewards, setRewards] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isConnected && address) {
      loadRewards();
    }
  }, [isConnected, address]);

  const loadRewards = async () => {
    try {
      const res = await pendingRewards(address);
      setRewards(res.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const handleStake = async () => {
    try {
      setLoading(true);
      setMessage('');
      const tx = await stake(amount);
      setMessage(`Staked! Tx hash: ${tx.hash}`);
      await loadRewards();
    } catch (err) {
      setMessage(err.message || 'Stake failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setMessage('');
      const tx = await withdraw(amount);
      setMessage(`Withdrawn! Tx hash: ${tx.hash}`);
      await loadRewards();
    } catch (err) {
      setMessage(err.message || 'Withdraw failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    try {
      setLoading(true);
      setMessage('');
      const tx = await claimRewards();
      setMessage(`Rewards claimed! Tx hash: ${tx.hash}`);
      await loadRewards();
    } catch (err) {
      setMessage(err.message || 'Claim failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3">
        <button
          onClick={handleStake}
          disabled={loading || !amount}
          className="flex-1 px-4 py-2 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Stake'}
        </button>

        <button
          onClick={handleWithdraw}
          disabled={loading || !amount}
          className="flex-1 px-4 py-2 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </div>

      <button
        onClick={handleClaim}
        disabled={loading}
        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Claim Rewards'}
      </button>

      <p className="text-sm text-gray-700">Pending Rewards: {rewards}</p>

      {message && (
        <p className="text-sm text-center text-gray-600 break-all">{message}</p>
      )}
    </div>
  );
}
