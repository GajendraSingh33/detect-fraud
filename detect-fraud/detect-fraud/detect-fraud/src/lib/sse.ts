// src/lib/sse.ts

type Subscriber = (data: any) => void;

class Hub {
  private channels: Map<string, Set<Subscriber>> = new Map();

  // subscribe to a channel
  subscribe(channel: string, subscriber: Subscriber) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
    }
    this.channels.get(channel)!.add(subscriber);

    // unsubscribe function
    return () => {
      this.channels.get(channel)?.delete(subscriber);
    };
  }

  // publish data to a channel
  publish(channel: string, data: any) {
    if (this.channels.has(channel)) {
      for (const subscriber of this.channels.get(channel)!) {
        subscriber(data);
      }
    }
  }
}

// ✅ export hub instance so it's available everywhere
export const hub = new Hub();
