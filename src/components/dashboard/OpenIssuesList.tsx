type Issue = { number: number; title: string; labels: string[]; updated_at: string; html_url: string };

export default function OpenIssuesList({ issues, slug }: { issues: Issue[]; slug: string }) {
  if (!issues.length) {
    return <p className="muted">🌿 没有 open issues。</p>;
  }
  return (
    <ul className="issue-list">
      {issues.map((i) => (
        <li key={i.number} className="issue-row">
          <a href={i.html_url} target="_blank" rel="noopener">
            <span className="issue-number">#{i.number}</span>
            <span className="issue-title">{i.title}</span>
            <span className="issue-labels">
              {i.labels.map((l) => (
                <span key={l} className="label-chip">{l}</span>
              ))}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}