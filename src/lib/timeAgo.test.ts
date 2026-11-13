import { describe, expect, it } from 'vitest';
import { timeAgo } from './timeAgo';

const NOW = Date.UTC(2026, 10, 13, 12);
const ago = (seconds: number) => timeAgo(new Date(NOW - seconds * 1000), NOW);
const DAY = 86400;

describe('timeAgo', () => {
  it('uses minutes, hours and days for recent posts', () => {
    expect(ago(5 * 60)).toBe('5 minutes ago');
    expect(ago(3600)).toBe('1 hour ago');
    expect(ago(DAY)).toBe('yesterday');
  });

  it('uses weeks, months and years for older posts', () => {
    expect(ago(14 * DAY)).toBe('2 weeks ago');
    expect(ago(65 * DAY)).toBe('2 months ago');
    expect(ago(891 * DAY)).toBe('2 years ago');
  });
});
