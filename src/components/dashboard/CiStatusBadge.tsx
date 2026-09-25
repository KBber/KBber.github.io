type Run = {
  name: string;
  status: string;
  conclusion: string | null;
  branch?: string;
  created_at: string;
  html_url: string;
};

export default function CiStatusBadge({ runs }: { runs: Run[] }) {
  if (!runs.length) return <p className="muted">未配置 GitHub Actions。</p>;
  return (
    <div className="ci-list">
      {runs.map((r) => {
        const ok = r.conclusion === 'success';
        const fail = r.conclusion === 'failure';
        const pending = r.status === 'in_progress' || r.status === 'queued';
        const cls = pending ? 'is-pending' : ok ? 'is-ok' : fail ? 'is-fail' : 'is-unknown';
        return (
          <a key={r.html_url} href={r.html_url} target="_blank" rel="noopener" className={`ci-row ${cls}`}>
            <span className="ci-dot" aria-hidden="true" />
            <span className="ci-name">{r.name}</span>
            <span className="ci-meta">
              {r.branch && <span className="ci-branch">🌿 {r.branch}</span>}
              <span className="ci-time">{new Date(r.created_at).toLocaleString('zh-CN')}</span>
            </span>
            <span className="ci-state">{r.conclusion || r.status}</span>
          </a>
        );
      })}
    </div>
  );
}