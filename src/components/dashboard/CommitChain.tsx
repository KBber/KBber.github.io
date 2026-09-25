import { normaliseAuthor, type CommitLite } from '../../lib/git-log';

export default function CommitChain({ slug, commits }: { slug: string; commits: CommitLite[] }) {
  if (!commits.length) return <p className="muted">无 commit 记录。</p>;
  return (
    <div className="commit-chain">
      <table className="commit-table">
        <thead>
          <tr>
            <th>SHA</th>
            <th>提交信息</th>
            <th>作者</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          {commits.map((c) => (
            <tr key={c.sha}>
              <td>
                <a href={`https://github.com/KBber/${slug}/commit/${c.sha}`} target="_blank" rel="noopener">
                  <code>{c.short_sha}</code>
                </a>
              </td>
              <td className="commit-msg-cell">{c.message.split('\n')[0]}</td>
              <td>{normaliseAuthor(c.author.email, c.author.name)}</td>
              <td className="muted">{new Date(c.date).toLocaleString('zh-CN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}