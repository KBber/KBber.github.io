import { useState } from 'react';
import type { CSSProperties } from 'react';
import { accentFor, timeAgo, POLICY_BADGES, type ProjectContext } from '../../lib/manifest';

type RepoSummary = {
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

export default function RepoCard({
  repo,
  manifest,
}: {
  repo: RepoSummary;
  manifest?: ProjectContext | null;
}) {
  const accent = accentFor(repo.slug);
  const policy = manifest?.ai_instructions?.update_policy;
  const policyMeta = policy ? POLICY_BADGES[policy] : null;

  return (
    <a
      className="liquid-glass repo-card"
      href={`/projects/${repo.slug}`}
      style={{ ['--accent' as any]: accent } as CSSProperties}
      data-policy={policy || 'unknown'}
    >
      <div className="repo-card-head">
        <div className="repo-card-title">
          <h3>{repo.name}</h3>
          <span className="repo-card-slug">/{repo.slug}</span>
        </div>
        {policyMeta && (
          <span
            className="policy-badge"
            style={{ background: policyMeta.color }}
            title={`Update policy: ${policy}`}
          >
            {policyMeta.icon} {policyMeta.label}
          </span>
        )}
      </div>

      <p className="repo-card-desc">{repo.description || '—'}</p>

      <div className="repo-card-meta">
        <span className="meta-chip">
          🌿 <code>{repo.default_branch}</code>
        </span>
        {repo.language && <span className="meta-chip">📝 {repo.language}</span>}
        <span className="meta-chip">⭐ {repo.stargazers_count}</span>
        {repo.open_issues_count > 0 && (
          <span className="meta-chip">📌 {repo.open_issues_count}</span>
        )}
        <span className="meta-chip">⏱ {timeAgo(repo.pushed_at)}</span>
      </div>

      <div className="repo-card-footer">
        <span className="card-link">→ 详情</span>
        <span className="card-link-soft">GitHub ↗</span>
      </div>
    </a>
  );
}