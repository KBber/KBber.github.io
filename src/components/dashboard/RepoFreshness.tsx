import { useState } from 'react';
import { fetchRepoFresh, clearFreshnessCache } from '../../lib/github';

type RepoSummary = {
  pushed_at: string;
  open_issues_count: number;
};

/**
 * ETag-aware manual revalidation chip. Click to ask GitHub whether the
 * cached snapshot is still current. Shows ✓ (fresh) or ⚠ (stale) on return.
 */
export default function RepoFreshness({ slug, snapshot }: { slug: string; snapshot: RepoSummary }) {
  const [state, setState] = useState<'idle' | 'loading' | 'fresh' | 'stale' | 'error'>('idle');
  const [info, setInfo] = useState<{ pushed: string; issues: number } | null>(null);

  async function refresh() {
    setState('loading');
    const data = await fetchRepoFresh('KBber', slug);
    if (!data) {
      setState('error');
      return;
    }
    const live = new Date(data.pushed_at).getTime();
    const cached = new Date(snapshot.pushed_at).getTime();
    setInfo({ pushed: data.pushed_at, issues: data.open_issues_count });
    setState(live > cached ? 'stale' : 'fresh');
  }

  return (
    <button
      className={`freshness-chip freshness-${state}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        refresh();
      }}
      title="Click to revalidate against GitHub (uses ETag)"
    >
      {state === 'idle' && '🔄'}
      {state === 'loading' && '⏳'}
      {state === 'fresh' && '✅ Fresh'}
      {state === 'stale' && '⚠ Stale'}
      {state === 'error' && '⚠ Error'}
      {info && <span className="freshness-detail">· issues {info.issues}</span>}
    </button>
  );
}

/** Reset module-level ETag cache (test helper, exposed for the demo). */
export { clearFreshnessCache };