// app/layout.jsx
import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Lonrad (LOD) Ecosystem',
  description: 'Stake and earn rewards with Lonrad Token',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
