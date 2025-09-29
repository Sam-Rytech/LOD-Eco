// app/faucet/page.jsx
'use client';

import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import FaucetForm from '@/components/FaucetForm';

export default function FaucetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-10">
        <Card>
          <FaucetForm />
        </Card>
      </main>
    </div>
  );
}
