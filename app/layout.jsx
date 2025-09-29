import './globals.css';
import Provider from './_appkit/provider';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'LOD DApp',
  description: 'Faucet and Staking for Lonrad Token on Base Mainnet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Provider>
          <Navbar />
          <main className="container p-6 mx-auto">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
