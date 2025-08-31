import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'Detect-Fraud', description: 'Real time fraud detection demo' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-black/5 dark:border-white/10">
          <div className="container py-4 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-md" />
              <span className="font-semibold">Detect-Fraud</span>
            </div>

            <nav className="flex gap-3">
              <Link className="btn" href="/">Dashboard</Link>
              <Link className="btn" href="/transactions">Transactions</Link>
              <Link className="btn" href="/rules">Rules</Link>
              <Link className="btn" href="/simulator">Simulator</Link>
            </nav>
          </div>
        </header>

        <main className="container py-6">{children}</main>
      </body>
    </html>
  )
}
