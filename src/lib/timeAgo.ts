const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
// Months and years are approximate (30 and 365 days); the tooltip shows the exact date.
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 86400],
  ['month', 30 * 86400],
  ['week', 7 * 86400],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];

/** "5 minutes ago", "yesterday", "2 years ago". */
export function timeAgo(date: Date, now = Date.now()): string {
  const seconds = Math.trunc((date.getTime() - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.trunc(seconds / size), unit);
  }
  return relativeTime.format(seconds, 'second');
}
