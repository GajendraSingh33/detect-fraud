// src/app/api/transactions/route.ts
import { NextResponse } from "next/server";
import { hub } from "@/lib/sse";

export async function POST(req: Request) {
  const body = await req.json();

  // Save to DB or process...
  
  // publish event
  hub.publish("events", { type: "transaction_created", payload: body });

  return NextResponse.json({ ok: true });
}
