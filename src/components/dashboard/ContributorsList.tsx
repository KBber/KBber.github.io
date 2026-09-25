type Contributor = { login: string; name?: string | null; avatar_url?: string; contributions: number };

export default function ContributorsList({ contributors }: { contributors: Contributor[] }) {
  if (!contributors.length) return <p className="muted">无贡献者数据。</p>;
  const total = contributors.reduce((s, c) => s + c.contributions, 0);
  return (
    <ul className="contrib-list">
      {contributors.map((c) => {
        const pct = total ? Math.round((c.contributions / total) * 100) : 0;
        return (
          <li key={c.login || c.name} className="contrib-row">
            {c.avatar_url ? <img src={c.avatar_url} alt={c.login} className="contrib-avatar" /> : <div className="contrib-avatar placeholder" />}
            <div className="contrib-info">
              <div className="contrib-name">{c.name || c.login}</div>
              <div className="contrib-bar"><span style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="contrib-meta">{c.contributions} · {pct}%</div>
          </li>
        );
      })}
    </ul>
  );
}