import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  const items = await prisma.alert.findMany({ include: { transaction: true }, orderBy: { createdAt: 'desc' }, take: 100 })
  return NextResponse.json({ items })
}
