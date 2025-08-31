import { differenceInMinutes } from 'date-fns'
import type { Transaction, Rule } from '@prisma/client'

export type RiskResult = { score: number; reasons: string[] }

// tiny in-memory per-user stats (demo only)
const stats = new Map<string, { count: number; sum: number; lastAt?: Date; lastLat?: number; lastLon?: number }>()

function haversine(lat1?: number, lon1?: number, lat2?: number, lon2?: number) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0
  const r = (d: number) => (d * Math.PI) / 180
  const R = 6371
  const dLat = r(lat2 - lat1)
  const dLon = r(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function applyRules(tx: Transaction, rules: Rule[]) {
  let bump = 0
  const notes: string[] = []
  for (const r of rules.filter(x => x.enabled)) {
    try {
      const d = JSON.parse(r.definition) as any
      const v = (tx as any)[d.field]
      let matched = false
      if (d.op === '>' && v > d.value) matched = true
      if (d.op === '>=' && v >= d.value) matched = true
      if (d.op === '<' && v < d.value) matched = true
      if ((d.op === '==' || d.op === '=') && v == d.value) matched = true
      if (d.op === 'in' && Array.isArray(d.value) && d.value.includes(v)) matched = true
      if (matched) {
        bump += d.weight ?? 10
        notes.push(`Rule matched: ${r.name}`)
      }
    } catch (e) { /* ignore bad rule */ }
  }
  return { bump, notes }
}

export async function score(tx: Transaction, rules: Rule[]): Promise<RiskResult> {
  const s = stats.get(tx.userId) ?? { count: 0, sum: 0 }
  const avg = s.count ? s.sum / s.count : 0
  let score = 0
  const reasons: string[] = []

  if (s.count > 5 && tx.amount > avg * 3) {
    score += 35
    reasons.push(`Amount anomaly: ${tx.amount.toFixed(2)} > 3×avg(${avg.toFixed(2)})`)
  }
  if (tx.amount >= 2000) { score += 20; reasons.push('High amount ≥ 2000') }

  if (s.lastAt) {
    const mins = Math.max(1, differenceInMinutes(new Date(), s.lastAt))
    if (mins <= 2) { score += 25; reasons.push('Rapid succession transactions') }
  }

  const km = haversine(s.lastLat, s.lastLon, tx.lat ?? undefined, tx.lon ?? undefined)
  if (km > 500 && s.lastAt) {
    const mins = Math.max(1, differenceInMinutes(new Date(), s.lastAt))
    const kmh = (km / mins) * 60
    if (kmh > 900) { score += 25; reasons.push(`Impossible travel ~${km.toFixed(0)}km`) }
  }

  const risky = ['giftcard', 'crypto', 'gambling']
  if (risky.includes(tx.category.toLowerCase())) { score += 15; reasons.push(`Risky category: ${tx.category}`) }

  const { bump, notes } = applyRules(tx, rules)
  score += bump
  reasons.push(...notes)

  s.count += 1
  s.sum += tx.amount
  s.lastAt = new Date()
  s.lastLat = tx.lat ?? s.lastLat
  s.lastLon = tx.lon ?? s.lastLon
  stats.set(tx.userId, s)

  return { score: Math.min(100, score), reasons }
}
