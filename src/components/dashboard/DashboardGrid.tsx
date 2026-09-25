import { useMemo, useState } from 'react';
import RepoCard from './RepoCard';
import type { ProjectContext } from '../../lib/manifest';

export type RepoSummary = {
  name: string;
  slug: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  open_issues_count: number;
  pushed_at: string;
};

type Props = {
  repos: RepoSummary[];
  manifests?: Record<string, ProjectContext | null>;
};

const POLICY_FILTERS = ['all', 'auto-update', 'manual-only', 'read-only'] as const;
type PolicyFilter = (typeof POLICY_FILTERS)[number];

function policyOf(p?: ProjectContext | null): string {
  return p?.ai_instructions?.update_policy || 'unknown';
}

export default function DashboardGrid({ repos, manifests = {} }: Props) {
  const [query, setQuery] = useState('');
  const [policy, setPolicy] = useState<PolicyFilter>('all');
  const [language, setLanguage] = useState<string>('all');

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ['all', ...[...set].sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    return repos.filter((r) => {
      if (query && !`${r.name} ${r.slug} ${r.description ?? ''}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (language !== 'all' && r.language !== language) return false;
      if (policy !== 'all') {
        const p = policyOf(manifests[r.slug]);
        if (policy === 'auto-update' && !['auto-merge-patch', 'pr-required'].includes(p)) return false;
        if (policy === 'manual-only' && p !== 'manual-only') return false;
        if (policy === 'read-only' && p !== 'read-only') return false;
      }
      return true;
    });
  }, [repos, query, policy, language, manifests]);

  return (
    <div className="dashboard">
      <div className="dashboard-filters liquid-glass">
        <input
          type="search"
          placeholder="🔍 搜索项目名 / 描述"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="filter-search"
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="filter-select">
          {languages.map((l) => (
            <option key={l} value={l}>
              {l === 'all' ? '🌐 全部语言' : l}
            </option>
          ))}
        </select>
        <div className="filter-policies">
          {POLICY_FILTERS.map((p) => (
            <button
              key={p}
              type="button"
              className={`filter-chip ${policy === p ? 'is-active' : ''}`}
              onClick={() => setPolicy(p)}
            >
              {p === 'all' ? '全部' : p === 'auto-update' ? '自动更新' : p === 'manual-only' ? '手动' : '只读'}
            </button>
          ))}
        </div>
        <span className="filter-count">{filtered.length} / {repos.length}</span>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-hint">没有匹配的项目。</p>
      ) : (
        <div className="repo-grid">
          {filtered.map((r) => (
            <RepoCard key={r.slug} repo={r} manifest={manifests[r.slug]} />
          ))}
        </div>
      )}
    </div>
  );
}