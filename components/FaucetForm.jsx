// components/FaucetForm.jsx
'use client';

import { useState } from 'react';
import { claimFaucet } from '../lib/contracts/faucet';

export default function FaucetForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    try {
      setLoading(true);
      setMessage('');
      const tx = await claimFaucet();
      setMessage(`Success! Tx hash: ${tx.hash}`);
    } catch (err) {
      setMessage(err.message || 'Claim failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClaim}
        disabled={loading}
        className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Claiming...' : 'Claim Tokens'}
      </button>

      {message && (
        <p className="text-sm text-center text-gray-600 break-all">{message}</p>
      )}
    </div>
  );
}
