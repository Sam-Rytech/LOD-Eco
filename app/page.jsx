import Card from '../components/Card';

export default function Home() {
  return (
    <div className="grid gap-6">
      <Card>
        <h1 className="mb-3 text-3xl font-bold">Lonrad Token DApp</h1>
        <p className="text-slate-600">
          Welcome to the Lonrad Token faucet and staking dApp on Base Mainnet.
        </p>
      </Card>
    </div>
  );
}
