import { describe, expect, it, vi } from 'vitest';
import { cached, invalidateCache, peekCache } from './cache';

const MINUTE = 60 * 1000;
const memoryOnly = { persist: false };

describe('cached', () => {
  it('shares one request between concurrent calls', async () => {
    const fetcher = vi.fn().mockResolvedValue('posts');
    const [a, b] = await Promise.all([
      cached('shared', MINUTE, fetcher, memoryOnly),
      cached('shared', MINUTE, fetcher, memoryOnly),
    ]);
    expect([a, b]).toEqual(['posts', 'posts']);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('returns the stale value when a refetch fails', async () => {
    await cached('stale', MINUTE, () => Promise.resolve('old'), memoryOnly);
    // A TTL of 0 makes the stored value stale, so this call refetches.
    const value = await cached('stale', 0, () => Promise.reject(new Error('offline')), memoryOnly);
    expect(value).toBe('old');
  });

  it("doesn't store a result that was invalidated while in flight", async () => {
    let resolve!: (value: string) => void;
    const request = cached('invalidated', MINUTE, () => new Promise<string>((r) => (resolve = r)), memoryOnly);
    invalidateCache('invalidated');
    resolve('deleted post');
    await request;
    expect(peekCache('invalidated', MINUTE, memoryOnly)).toBeUndefined();
  });
});
