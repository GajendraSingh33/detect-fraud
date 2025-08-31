'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function TransactionTable() {
  const { data } = useSWR('/api/transactions', fetcher, { refreshInterval: 4000 })
  const items = data?.items ?? []

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left opacity-70">
            <th className="py-2">Time</th>
            <th>Usr</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Category</th>
            <th>Device</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t: any) => (
            <tr key={t.id} className="border-t border-black/5 dark:border-white/10">
              <td className="py-2">{new Date(t.createdAt).toLocaleTimeString()}</td>
              <td>{t.userId.slice(0, 6)}</td>
              <td>₹{t.amount.toFixed(2)}</td>
              <td>{t.merchant}</td>
              <td>{t.category}</td>
              <td>{t.deviceId?.slice(0, 6) || '-'}</td>
              <td>{t.alert ? <span className="badge-danger">ALERT</span> : <span className="badge-ok">OK</span>}</td>
              <td>{t.alert?.score?.toFixed(0) ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
