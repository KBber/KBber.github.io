/**
 * Git log utilities — author normalisation + commit grouping.
 * Two email identities (web vs CLI) both map to the same display name.
 */
export const KBBER_ALIASES: Record<string, string> = {
  '116370811+KBber@users.noreply.github.com': 'KBber',
  'zhongliwansui@outlook.com': 'KBber',
  'github-actions[bot]@users.noreply.github.com': 'github-actions',
};

export function normaliseAuthor(email: string, fallback = 'unknown'): string {
  return KBBER_ALIASES[email] || fallback;
}

export type CommitLite = {
  sha: string;
  short_sha: string;
  message: string;
  author: { name: string; email: string };
  date: string;
};

/** Group commits by day for the timeline. */
export function groupByDay(commits: CommitLite[]): { day: string; items: CommitLite[] }[] {
  const buckets = new Map<string, CommitLite[]>();
  for (const c of commits) {
    const d = new Date(c.date);
    const key = isNaN(d.getTime()) ? 'unknown' : d.toISOString().slice(0, 10);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(c);
  }
  return [...buckets.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([day, items]) => ({ day, items }));
}