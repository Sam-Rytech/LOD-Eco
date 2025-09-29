// components/WalletButton.jsx
'use client';

import { useAppKit } from '@reown/appkit/react';

export default function WalletButton() {
  const { address, isConnected, connect, disconnect } = useAppKit();

  const shortAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <button
      onClick={isConnected ? disconnect : connect}
      className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
    >
      {isConnected ? shortAddress(address) : 'Connect Wallet'}
    </button>
  );
}
