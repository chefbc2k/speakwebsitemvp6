export interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
}

interface RateLimitStore {
  tokens: Set<string>;
  timestamp: number;
}

export function rateLimit(config: RateLimitConfig) {
  const stores = new Map<string, RateLimitStore>();

  return {
    check: async (req: Request, limit: number) => {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
      const store = stores.get(ip) || { tokens: new Set(), timestamp: now };

      if (now - store.timestamp > config.interval) {
        store.tokens.clear();
        store.timestamp = now;
      }

      if (store.tokens.size >= limit) {
        throw new Error('Rate limit exceeded');
      }

      store.tokens.add(crypto.randomUUID());
      stores.set(ip, store);

      return true;
    },
  };
}