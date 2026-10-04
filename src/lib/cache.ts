type CacheEntry<T> = { value: T; storedAt: number };

const PREFIX = 'reader-cache:';
const memory = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

function read<T>(key: string): CacheEntry<T> | null {
  const fromMemory = memory.get(key) as CacheEntry<T> | undefined;
  if (fromMemory) return fromMemory;
  try {
    const stored = localStorage.getItem(PREFIX + key);
    if (stored === null) return null;
    const entry: CacheEntry<T> = JSON.parse(stored);
    memory.set(key, entry);
    return entry;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T) {
  const entry: CacheEntry<T> = { value, storedAt: Date.now() };
  memory.set(key, entry);
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    /* storage full or unavailable; the in-memory copy still works for this page load */
  }
}

/**
 * Returns the cached value for `key` if it is younger than `ttlMs`, otherwise calls `fetcher`
 * and caches the result in memory and localStorage (so it survives reloads and is shared by tabs).
 * Concurrent calls share one request. If the request fails, a stale cached value is returned
 * instead when there is one.
 */
export async function cached<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const entry = read<T>(key);
  if (entry !== null && Date.now() - entry.storedAt < ttlMs) return entry.value;

  const pending = inFlight.get(key) as Promise<T> | undefined;
  if (pending) return pending;

  const request = fetcher()
    .then((value) => {
      write(key, value);
      return value;
    })
    .catch((err) => {
      if (entry !== null) {
        console.warn(`Request for "${key}" failed, using cached data`, err);
        return entry.value;
      }
      throw err;
    })
    .finally(() => inFlight.delete(key));

  inFlight.set(key, request);
  return request;
}

/** Drops the cached value for `key`, e.g. after creating something that changes it. */
export function invalidateCache(key: string) {
  memory.delete(key);
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* storage unavailable, nothing to remove */
  }
}
