type CacheEntry<T> = { value: T; storedAt: number };

export interface CacheOptions {
  /** Also keep the value in localStorage, so it survives reloads and is shared by tabs. Defaults to true. */
  persist?: boolean;
}

const PREFIX = 'reader-cache:';
const memory = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

function read<T>(key: string, persist: boolean): CacheEntry<T> | null {
  const fromMemory = memory.get(key) as CacheEntry<T> | undefined;
  if (fromMemory) return fromMemory;
  if (!persist) return null;
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

function write<T>(key: string, entry: CacheEntry<T>, persist: boolean) {
  memory.set(key, entry);
  if (!persist) return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    /* storage full or unavailable; the in-memory copy still works for this page load */
  }
}

function isFresh(entry: CacheEntry<unknown>, ttlMs: number): boolean {
  return Date.now() - entry.storedAt < ttlMs;
}

/**
 * Returns the cached value for `key` if it is younger than `ttlMs`, otherwise calls `fetcher`
 * and caches the result in memory, and in localStorage unless `persist` is false.
 * Concurrent calls share one request. If the request fails, a stale cached value is returned
 * instead when there is one.
 */
export async function cached<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
  { persist = true }: CacheOptions = {}
): Promise<T> {
  const entry = read<T>(key, persist);
  if (entry !== null && isFresh(entry, ttlMs)) return entry.value;

  const pending = inFlight.get(key) as Promise<T> | undefined;
  if (pending) return pending;

  const request: Promise<T> = fetcher()
    .then((value) => {
      // Skip the write if the key was invalidated while this request was in flight.
      if (inFlight.get(key) === request) write(key, { value, storedAt: Date.now() }, persist);
      return value;
    })
    .catch((err) => {
      if (entry !== null) {
        console.warn(`Request for "${key}" failed, using cached data`, err);
        return entry.value;
      }
      throw err;
    })
    .finally(() => {
      if (inFlight.get(key) === request) inFlight.delete(key);
    });

  inFlight.set(key, request);
  return request;
}

/** Returns the cached value for `key` if there is one younger than `ttlMs`, without fetching. */
export function peekCache<T>(key: string, ttlMs: number, { persist = true }: CacheOptions = {}): T | undefined {
  const entry = read<T>(key, persist);
  return entry !== null && isFresh(entry, ttlMs) ? entry.value : undefined;
}

/**
 * Updates every value cached in memory whose key starts with `keyPrefix`, e.g. to patch one item in cached lists.
 * Keeps each entry's age, so patching doesn't make stale data look fresh.
 */
export function updateCache<T>(keyPrefix: string, update: (value: T) => T, { persist = true }: CacheOptions = {}) {
  for (const [key, entry] of memory) {
    if (key.startsWith(keyPrefix)) {
      write(key, { value: update(entry.value as T), storedAt: entry.storedAt }, persist);
    }
  }
}

/** Drops the cached value for `key`, e.g. after creating something that changes it. */
export function invalidateCache(key: string) {
  memory.delete(key);
  inFlight.delete(key);
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* storage unavailable, nothing to remove */
  }
}
