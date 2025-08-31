import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  const items = await prisma.rule.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = await prisma.rule.create({
    data: { name: body.name, definition: body.definition, enabled: !!body.enabled }
  })
  return NextResponse.json({ ok: true, item: created })
}
