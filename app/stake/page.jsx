// app/stake/page.jsx
'use client';

import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import StakeForm from '@/components/StakeForm';

export default function StakePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-10">
        <Card>
          <StakeForm />
        </Card>
      </main>
    </div>
  );
}
