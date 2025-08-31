// src/app/api/stream/route.ts
import { hub } from "@/lib/sse";

export async function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // subscribe to "events"
      const unsubscribe = hub.subscribe("events", (data) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      });

      // stop when client disconnects
      req.signal.addEventListener("abort", unsubscribe);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}


