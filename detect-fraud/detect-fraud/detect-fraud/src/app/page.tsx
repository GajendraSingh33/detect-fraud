'use client'
import { useEffect, useState } from 'react'
import KPI from './components/KPI'
import { LineSeries, Spark } from './components/Charts'

export default function Page() {
  const [stats, setStats] = useState({ txns: 0, alerts: 0, rate: 0 })
  const [series, setSeries] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const es = new EventSource('/api/stream')
    es.addEventListener('metrics', (e: MessageEvent) => {
      const d = JSON.parse(e.data)
      setStats(d)
      setSeries(s => [...s.slice(-59), { name: new Date().toLocaleTimeString(), value: d.rate }])
    })
    return () => es.close()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI label="Transactions" value={String(stats.txns)} sub="Total ingested" />
        <KPI label="Alerts" value={String(stats.alerts)} sub="Total flagged" />
        <KPI label="Alert Rate" value={`${stats.rate.toFixed(1)}%`} sub="Last minute" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Spark data={series} />
        <LineSeries data={series} />
      </div>
    </div>
  )
}

