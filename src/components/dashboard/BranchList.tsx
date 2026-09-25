type Branch = { name: string; protected: boolean };

export default function BranchList({ branches, current }: { branches: Branch[]; current: string }) {
  if (!branches.length) return <p className="muted">仅 main 分支。</p>;
  return (
    <ul className="branch-pills">
      {branches.map((b) => (
        <li
          key={b.name}
          className={`branch-pill ${b.name === current ? 'is-current' : ''} ${b.protected ? 'is-protected' : ''}`}
        >
          🌿 <code>{b.name}</code>
          {b.name === current && <span className="branch-tag">CURRENT</span>}
          {b.protected && <span className="branch-tag">🔒</span>}
        </li>
      ))}
    </ul>
  );
}