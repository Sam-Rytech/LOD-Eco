// components/Navbar.jsx
'use client';

import Link from 'next/link';
import WalletButton from './WalletButton';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          LOD DApp
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          <Link href="/faucet" className="text-gray-700 hover:text-blue-600">
            Faucet
          </Link>
          <Link href="/stake" className="text-gray-700 hover:text-blue-600">
            Stake
          </Link>
        </div>

        {/* Wallet Connect Button */}
        <WalletButton />
      </div>
    </nav>
  );
}
