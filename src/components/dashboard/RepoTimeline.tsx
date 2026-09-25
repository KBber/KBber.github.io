import { useState } from 'react';
import type { CSSProperties } from 'react';
import { groupByDay, type CommitLite } from '../../lib/git-log';
import { accentFor } from '../../lib/manifest';

/**
 * Vertical commit chain grouped by day, with "show more" pagination.
 * Renders raw `commits[]` from snapshot files; lighter than the full
 * CommitChain (which has author normalisation etc.).
 */
export default function RepoTimeline({ slug, commits }: { slug: string; commits: CommitLite[] }) {
  const [show, setShow] = useState(10);
  const accent = accentFor(slug);
  const visible = commits.slice(0, show);
  const groups = groupByDay(visible);

  return (
    <div className="repo-timeline" style={{ ['--accent' as any]: accent } as CSSProperties}>
      {groups.map((g) => (
        <div className="timeline-day" key={g.day}>
          <div className="day-label">{g.day}</div>
          <ol className="timeline-list">
            {g.items.map((c) => (
              <li className="timeline-item" key={c.sha}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="timeline-body">
                  <a href={`https://github.com/KBber/${slug}/commit/${c.sha}`} target="_blank" rel="noopener" className="commit-sha">{c.short_sha}</a>
                  <p className="commit-msg">{c.message.split('\n')[0]}</p>
                  <p className="commit-author">
                    <span>{c.author.name}</span>
                    <span className="commit-time">· {new Date(c.date).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {commits.length > show && (
        <button className="timeline-more" onClick={() => setShow((n) => n + 10)}>
          显示更多 ({commits.length - show} 剩余)
        </button>
      )}
    </div>
  );
}