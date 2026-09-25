import { useMemo, useState } from 'react';
import type { ProjectContext } from '../../lib/manifest';

type CommitLite = { sha: string; short_sha: string; message: string; date: string };

type Strategy = 'revert' | 'reset-hard' | 'revert-and-tag' | 'new-release';
const STRATEGIES: { value: Strategy; label: string; destructive: boolean; description: string }[] = [
  { value: 'revert',          label: 'Revert (安全)',      destructive: false, description: '创建一个反向 commit，保留历史' },
  { value: 'reset-hard',      label: 'Reset Hard (危险)',  destructive: true,  description: '重写 main 历史 (会丢 commit)，需要 force push' },
  { value: 'revert-and-tag',  label: 'Revert + Tag',       destructive: false, description: 'Revert 后打 tag 标记，便于追溯' },
  { value: 'new-release',     label: 'New Release',        destructive: false, description: '在指定 SHA 创建 GitHub Release，标记回滚点' },
];

function buildCommand(strategy: Strategy, sha: string, branch: string): string {
  switch (strategy) {
    case 'revert':
      return `# 在本地工作区执行:\ngit checkout ${branch}\ngit pull --rebase\ngit revert --no-edit ${sha}\ngit push origin ${branch}`;
    case 'reset-hard':
      return `# ⚠ DESTRUCTIVE — requires force push\ngit checkout ${branch}\ngit fetch origin\ngit reset --hard ${sha}\ngit push --force-with-lease origin ${branch}`;
    case 'revert-and-tag':
      return `git checkout ${branch}\ngit pull --rebase\ngit revert --no-edit ${sha}\ngit tag -a rollback-${sha.slice(0, 7)} -m "Rollback to ${sha.slice(0, 7)}"\ngit push origin ${branch} --follow-tags`;
    case 'new-release':
      return `# 需要 gh CLI\ngh release create rollback-$(date +%Y%m%d) \\\n  --target ${sha} \\\n  --title "Rollback from ${sha.slice(0, 7)}" \\\n  --notes "Reverted to ${sha}"`;
  }
}

export default function RollbackHelper({
  manifest,
  commits,
  defaultBranch,
}: {
  manifest?: ProjectContext | null;
  commits: CommitLite[];
  defaultBranch: string;
}) {
  const initialStrategy = (manifest?.ai_instructions.rollback_policy.default_strategy ?? 'revert') as Strategy;
  const [strategy, setStrategy] = useState<Strategy>(initialStrategy);
  // Default target = second-most-recent (never HEAD itself).
  const [targetSha, setTargetSha] = useState<string>(commits[1]?.sha ?? commits[0]?.sha ?? '');
  const [confirmed, setConfirmed] = useState(false);

  const command = useMemo(() => buildCommand(strategy, targetSha, defaultBranch), [strategy, targetSha, defaultBranch]);
  const destructive = STRATEGIES.find((s) => s.value === strategy)?.destructive;

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 1500);
    } catch {
      // Clipboard API may be blocked; fall back to selecting the textarea.
      const ta = document.getElementById('rollback-cmd') as HTMLTextAreaElement | null;
      ta?.select();
    }
  }

  if (!commits.length) {
    return <p className="muted">没有可回滚的 commit。</p>;
  }

  return (
    <div className="rollback-helper liquid-glass">
      <h3>🔁 回滚助手</h3>
      <p className="rollback-hint">选择一个目标 commit 与策略，下方命令可直接复制到本地终端执行。</p>

      <div className="rollback-row">
        <label>
          <span>策略</span>
          <select value={strategy} onChange={(e) => setStrategy(e.target.value as Strategy)}>
            {STRATEGIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>目标 commit</span>
          <select value={targetSha} onChange={(e) => setTargetSha(e.target.value)}>
            {commits.map((c) => (
              <option key={c.sha} value={c.sha}>
                {c.short_sha} — {c.message.split('\n')[0].slice(0, 40)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {destructive && (
        <label className="rollback-warn">
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          ⚠ 我明白 <code>reset-hard</code> 会<strong>重写 main 历史</strong>并需要 force push
        </label>
      )}

      <textarea
        id="rollback-cmd"
        readOnly
        className="rollback-cmd"
        value={command}
        rows={Math.max(4, command.split('\n').length)}
      />

      <button
        className="rollback-copy"
        disabled={destructive && !confirmed}
        onClick={copy}
      >
        {confirmed ? '✅ 已复制' : '📋 复制命令'}
      </button>

      <p className="rollback-policy">
        Manifest 策略：<code>{manifest?.ai_instructions.rollback_policy.default_strategy ?? 'revert'}</code> ·
        需要确认：<code>{String(manifest?.ai_instructions.rollback_policy.require_confirmation ?? true)}</code>
      </p>
    </div>
  );
}