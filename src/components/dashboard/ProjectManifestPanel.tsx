import { useState } from 'react';
import type { ProjectContext } from '../../lib/manifest';

export default function ProjectManifestPanel({
  manifest,
  raw,
  slug,
}: {
  manifest: ProjectContext | null;
  raw: unknown;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!manifest) {
    return (
      <div className="liquid-glass manifest-panel is-missing">
        <h3>📜 PROJECT_CONTEXT.json</h3>
        <p>
          此项目尚未发布 <code>PROJECT_CONTEXT.json</code>。AI 无法直接读取项目状态、更新策略和回滚指令。
        </p>
        <p className="muted">
          修复方法：在 <a href={`https://github.com/KBber/${slug}`} target="_blank" rel="noopener">KBber/{slug}</a> 的
          <code>main</code> 分支根目录添加 <code>PROJECT_CONTEXT.json</code>（schema 见
          <code> schemas/project-context.schema.json</code>），或在本地运行{' '}
          <code>python tools/bootstrap_project_context.py --slug {slug} --push</code>。
        </p>
      </div>
    );
  }

  async function copyRaw() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(raw, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="liquid-glass manifest-panel">
      <div className="manifest-head" onClick={() => setOpen((o) => !o)} role="button" tabIndex={0}>
        <h3>
          📜 PROJECT_CONTEXT.json
          <span className="manifest-valid">✅ v{manifest.schema_version} valid</span>
        </h3>
        <span className="manifest-toggle">{open ? '收起' : '展开'}</span>
      </div>
      {open && (
        <>
          <pre className="manifest-json">{JSON.stringify(raw, null, 2)}</pre>
          <button className="manifest-copy" onClick={copyRaw}>
            {copied ? '✅ 已复制' : '📋 复制 JSON'}
          </button>
        </>
      )}
    </div>
  );
}