'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { claimFaucet, getDripAmount, getCooldownTime, getLastClaimed } from '@/lib/contracts/faucet';
import { getBalance, getDecimals } from '@/lib/contracts/token';
import { ethers } from 'ethers';

export default function FaucetForm() {
  const { address, isConnected } = useAccount();
  const [dripAmount, setDripAmount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [lastClaim, setLastClaim] = useState(0);
  const [balance, setBalance] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [drip, cd] = await Promise.all([getDripAmount(), getCooldownTime()]);
        setDripAmount(Number(drip));
        setCooldown(Number(cd));
        if (address) {
          const [claim, bal, dec] = await Promise.all([
            getLastClaimed(address),
            getBalance(address),
            getDecimals(),
          ]);
          setLastClaim(Number(claim));
          setBalance(bal);
          setDecimals(Number(dec));
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [address]);

  const handleClaim = async () => {
    try {
      setLoading(true);
      setTxHash(null);
      const receipt = await claimFaucet();
      setTxHash(receipt.hash);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Claim failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return <p className="text-center text-gray-400">Connect wallet to use faucet</p>;
  }

  return (
    <div className="max-w-md p-6 mx-auto bg-white shadow-md rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">Faucet</h2>
      <p className="mb-2">Drip amount: {ethers.formatUnits(dripAmount, decimals)} LOD</p>
      <p className="mb-2">Cooldown: {cooldown / 60} min</p>
      <p className="mb-2">Your balance: {ethers.formatUnits(balance, decimals)} LOD</p>
      <button
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
        onClick={handleClaim}
      >
        {loading ? 'Claiming...' : 'Claim'}
      </button>
      {txHash && (
        <p className="mt-3 text-sm text-green-600 break-all">
          Tx sent: {txHash}
        </p>
      )}
    </div>
  );
}
