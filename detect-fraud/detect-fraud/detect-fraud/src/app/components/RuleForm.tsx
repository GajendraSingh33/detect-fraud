'use client'
import { useEffect, useState } from 'react'

type Rule = { id?: string; name: string; definition: string; enabled: boolean }

export default function RuleForm() {
  const [rules, setRules] = useState<Rule[]>([])
  const [form, setForm] = useState<Rule>({ name: '', definition: '{"field":"amount","op":">","value":1500,"weight":20}', enabled: true })

  async function load() {
    const res = await fetch('/api/rules')
    const j = await res.json()
    setRules(j.items ?? [])
  }

  useEffect(() => { load() }, [])

  async function create() {
    await fetch('/api/rules', { method: 'POST', body: JSON.stringify(form) })
    setForm({ ...form, name: '' })
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="card grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm">Name</label>
          <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm">Definition (JSON)</label>
          <input className="input" value={form.definition} onChange={e => setForm({ ...form, definition: e.target.value })} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.enabled} onChange={e => setForm({ ...form, enabled: e.target.checked })} />
          <span>Enabled</span>
        </div>
        <button className="btn" onClick={create}>Add Rule</button>
      </div>

      <div className="card">
        <table className="w-full text-sm">
          <thead><tr className="text-left opacity-70"><th>Name</th><th>Definition</th><th>Enabled</th></tr></thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.id} className="border-t border-black/5 dark:border-white/10">
                <td className="py-2">{r.name}</td>
                <td><code className="text-xs opacity-80">{r.definition}</code></td>
                <td>{r.enabled ? <span className="badge-ok">ON</span> : <span className="badge-warn">OFF</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
