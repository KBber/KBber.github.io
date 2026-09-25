/**
 * Lightweight GitHub REST helpers for client-side revalidation.
 * Anonymous endpoints are used; cache ETag per-repo to respect the 60 req/h quota.
 */
const GH_API = 'https://api.github.com';

export type RepoSummary = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  has_pages: boolean;
  topics: string[];
};

/**
 * Fetch a repo's metadata with ETag. Returns null on 304 (unchanged).
 * Stores the ETag in `etagCache` (module-level) so subsequent calls save quota.
 */
const etagCache = new Map<string, { etag: string; data: RepoSummary }>();

export async function fetchRepoFresh(owner: string, repo: string): Promise<RepoSummary | null> {
  const key = `${owner}/${repo}`;
  const cached = etagCache.get(key);
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (cached) headers['If-None-Match'] = cached.etag;

  const r = await fetch(`${GH_API}/repos/${owner}/${repo}`, { headers, cache: 'no-store' });
  if (r.status === 304 && cached) return cached.data;
  if (!r.ok) return null;

  const etag = r.headers.get('ETag');
  const data = (await r.json()) as RepoSummary;
  if (etag) etagCache.set(key, { etag, data });
  return data;
}

/** Clear the ETag cache (useful for tests / manual reset). */
export function clearFreshnessCache(): void {
  etagCache.clear();
}