/**
 * PROJECT_CONTEXT.json loader + Zod schema.
 *
 * Every KBber project ships a `PROJECT_CONTEXT.json` at the repo root.
 * Any agent can `fetch raw.githubusercontent.com/.../PROJECT_CONTEXT.json`
 * and immediately understand the project: state, update policy,
 * rollback strategy, and pre-baked prompts.
 */
import { z } from 'zod';

export const ManifestSchema = z.object({
  schema_version: z.literal('1.0.0'),
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  owner: z.literal('KBber'),
  summary: z.string().max(280),
  tags: z.array(z.string()).default([]),
  stack: z
    .object({
      languages: z.array(z.string()).default([]),
      frameworks: z.array(z.string()).default([]),
      infra: z.array(z.string()).default([]),
    })
    .default({}),
  state: z.object({
    default_branch: z.string(),
    last_commit_sha: z.string().length(40),
    last_commit_at: z.string(),
    protected_branches: z.array(z.string()).default([]),
    open_issues_count: z.number().int().min(0).default(0),
    releases: z.array(z.string()).default([]),
  }),
  ai_instructions: z.object({
    update_policy: z.enum(['auto-merge-patch', 'pr-required', 'manual-only', 'read-only']),
    rollback_policy: z.object({
      default_strategy: z.enum(['revert', 'reset-hard', 'revert-and-tag', 'new-release']),
      require_confirmation: z.boolean().default(true),
    }),
    aliases: z.record(z.string()).default({}),
    prompts: z
      .object({
        summarize: z.string().default(''),
        next_step: z.string().default(''),
        rollback: z.string().default(''),
      })
      .default({}),
  }),
});

export type ProjectContext = z.infer<typeof ManifestSchema>;

/**
 * Load a project's manifest from raw.githubusercontent.com.
 * Returns null if missing or invalid (caller decides what to render).
 */
export async function loadManifest(slug: string, branch = 'main'): Promise<ProjectContext | null> {
  const url = `https://raw.githubusercontent.com/KBber/${slug}/${branch}/PROJECT_CONTEXT.json`;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return null;
    return ManifestSchema.parse(await r.json());
  } catch {
    return null;
  }
}

/** Stable hash → one of 8 brand accents. */
const ACCENTS = ['#06B6D4', '#7C3AED', '#0EA5E9', '#22C55E', '#14B8A6', '#F59E0B', '#A855F7', '#EF4444'];
export function accentFor(slug: string): string {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return ACCENTS[h % ACCENTS.length];
}

/** Policy badge config */
export const POLICY_BADGES: Record<ProjectContext['ai_instructions']['update_policy'], { icon: string; label: string; color: string }> = {
  'auto-merge-patch': { icon: '🟢', label: 'Auto-update', color: '#22C55E' },
  'pr-required':      { icon: '🟡', label: 'PR Required', color: '#F59E0B' },
  'manual-only':      { icon: '🟠', label: 'Manual Only', color: '#FB923C' },
  'read-only':        { icon: '🔒', label: 'Read Only',   color: '#94A3B8' },
};

/** Human-readable age (e.g. "2h ago", "3d ago", "5w ago") */
export function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '—';
  const diff = Math.max(0, Date.now() - t);
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const w = Math.floor(d / 7);
  if (w < 52) return `${w}w ago`;
  const y = Math.floor(d / 365);
  return `${y}y ago`;
}