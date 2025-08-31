'use client'
import { useEffect, useState } from 'react'
import { randomTransactionFor } from '@/lib/utils'

export default function Simulator() {
  const [running, setRunning] = useState(false)
  const [rate, setRate] = useState(4)
  const users = ['u1', 'u2', 'u3', 'u4']

  useEffect(() => {
    if (!running) return
    const iv = setInterval(async () => {
      const tx = randomTransactionFor(users[Math.floor(Math.random() * users.length)])
      await fetch('/api/transactions', { method: 'POST', body: JSON.stringify(tx) })
    }, 1000 / Math.max(1, rate))
    return () => clearInterval(iv)
  }, [running, rate])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Traffic Simulator</h1>
      <div className="card flex items-center gap-4">
        <button className="btn" onClick={() => setRunning(s => !s)}>{running ? 'Stop' : 'Start'}</button>
        <label className="text-sm">Rate (tx/sec)</label>
        <input className="input max-w-[120px]" type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </div>
      <p className="opacity-70 text-sm">Simulator posts to <code>transactions</code> and you will see the Dashboard and Transactions update in real time.</p>
    </div>
  )
}
