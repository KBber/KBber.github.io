"""
Bootstrap PROJECT_CONTEXT.json for KBber-owned repositories.

Reads the GitHub repo list, drafts a default manifest for each non-fork
repo, optionally pushes it via the Contents API. Default policy is the
most conservative (manual-only) so KBber can opt repos in explicitly.

Usage:
  python tools/bootstrap_project_context.py            # draft + print, no push
  python tools/bootstrap_project_context.py --push    # draft + push
  python tools/bootstrap_project_context.py --force   # overwrite existing
  python tools/bootstrap_project_context.py --slug tenderguard   # single repo
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import time
from pathlib import Path
from typing import Any

import requests

API = "https://api.github.com"
TOKEN = (
    os.environ.get("GH_TOKEN")
    or os.environ.get("GITHUB_TOKEN")
    or os.environ.get("DASHBOARD_PAT")
)
HEADERS: dict[str, str] = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "kbber-bootstrap-manifest",
    "X-GitHub-Api-Version": "2022-11-28",
}
if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"
S = requests.Session()
S.headers.update(HEADERS)


def gh(path: str, params: dict | None = None) -> Any:
    r = S.get(f"{API}{path}", params=params, timeout=30)
    if r.status_code == 404:
        return None
    r.raise_for_status()
    return r.json()


def load_repos() -> list[dict]:
    """Read repos.json from the working dir if present, else hit the API."""
    local = Path("repos.json")
    if local.exists():
        return json.loads(local.read_text(encoding="utf-8"))
    print("repos.json not found; fetching from GitHub...", file=sys.stderr)
    out = []
    page = 1
    while True:
        chunk = gh("/users/KBber/repos", {"per_page": 100, "page": page})
        if not chunk:
            break
        out.extend(chunk)
        if len(chunk) < 100:
            break
        page += 1
    return out


def build_manifest(repo: dict, last_commit: dict | None) -> dict:
    desc = (repo.get("description") or "KBber project").strip()
    tags = list(repo.get("topics") or [])
    if not tags and repo.get("language"):
        tags = [repo["language"].lower()]

    stack = {"languages": [], "frameworks": [], "infra": []}
    if repo.get("language"):
        stack["languages"] = [repo["language"]]

    state = {
        "default_branch": repo["default_branch"],
        "last_commit_sha": last_commit["sha"] if last_commit else "",
        "last_commit_at":  (last_commit["created_at"] if last_commit else repo["pushed_at"]) or "",
        "protected_branches": [repo["default_branch"]],
        "open_issues_count":  repo.get("open_issues_count", 0),
        "releases": [],
    }

    return {
        "schema_version": "1.0.0",
        "name": repo["name"],
        "slug": repo["name"],
        "owner": "KBber",
        "summary": desc[:280],
        "tags": tags,
        "stack": stack,
        "state": state,
        "ai_instructions": {
            "update_policy": "manual-only",
            "rollback_policy": {
                "default_strategy": "revert",
                "require_confirmation": True,
            },
            "aliases": {
                "116370811+KBber@users.noreply.github.com": "KBber",
                "zhongliwansui@outlook.com": "KBber",
                "github-actions[bot]@users.noreply.github.com": "github-actions",
            },
            "prompts": {
                "summarize": (
                    f"Read PROJECT_CONTEXT.json and the last 10 commits of KBber/{repo['name']}. "
                    f"Summarise what this project does today and what changed recently."
                ),
                "next_step": (
                    f"Based on PROJECT_CONTEXT.json update_policy and the last 5 commits, "
                    f"propose the next safe change. Do not push without explicit human approval "
                    f"(policy=manual-only)."
                ),
                "rollback": (
                    f"Given a target commit SHA, generate the safest rollback per "
                    f"PROJECT_CONTEXT.json ai_instructions.rollback_policy.default_strategy, "
                    f"and require explicit confirmation before any destructive ref."
                ),
            },
        },
    }


def get_existing(owner: str, repo: str, branch: str) -> dict | None:
    last = None
    for i in range(4):
        try:
            r = S.get(f"{API}/repos/{owner}/{repo}/contents/PROJECT_CONTEXT.json",
                      params={"ref": branch}, timeout=30)
            if r.status_code == 404:
                return None
            if r.status_code == 403:
                # Rate-limited; treat as "unknown" → continue, don't overwrite blindly.
                print(f"    [skip-existing] {repo}: 403 (rate-limited), assuming absent", file=sys.stderr)
                return None
            if not r.ok:
                last = f"HTTP {r.status_code}"
                time.sleep(2 ** i)
                continue
            return r.json()
        except Exception as e:
            last = f"EXC {type(e).__name__}: {e}"
            time.sleep(2 ** i)
    print(f"    [existing-check] {repo}: {last}", file=sys.stderr)
    return None


def put_file(owner: str, repo: str, branch: str, content_bytes: bytes, message: str, sha: str | None) -> bool:
    payload = {
        "message": message,
        "branch": branch,
        "content": base64.b64encode(content_bytes).decode(),
    }
    if sha:
        payload["sha"] = sha
    r = S.put(f"{API}/repos/{owner}/{repo}/contents/PROJECT_CONTEXT.json", json=payload, timeout=60)
    return r.ok


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--push", action="store_true")
    p.add_argument("--force", action="store_true")
    p.add_argument("--slug", help="Only process this repo name")
    p.add_argument("--include-forks", action="store_true")
    args = p.parse_args()

    repos = load_repos()
    print(f"Loaded {len(repos)} repos", file=sys.stderr)

    drafted = 0
    skipped = 0
    pushed = 0
    failed = 0
    out_dir = Path("manifests-draft")
    out_dir.mkdir(exist_ok=True)

    for r in repos:
        if args.slug and r["name"] != args.slug:
            continue
        if r.get("fork") and not args.include_forks:
            print(f"  SKIP {r['name']} (fork)", file=sys.stderr)
            skipped += 1
            continue
        if r.get("archived"):
            print(f"  SKIP {r['name']} (archived)", file=sys.stderr)
            skipped += 1
            continue

        owner = r["owner"]["login"]
        slug = r["name"]
        branch = r["default_branch"]

        existing = get_existing(owner, slug, branch)
        if existing and not args.force:
            print(f"  SKIP {slug} (manifest exists, use --force to overwrite)", file=sys.stderr)
            skipped += 1
            continue

        # Prefer local snapshot if present (saves a call), else fall back to API.
        last_commit = None
        snap_path = Path("src/data/snapshots") / f"{slug}.json"
        if snap_path.exists():
            try:
                snap = json.loads(snap_path.read_text(encoding="utf-8"))
                if snap.get("commits"):
                    first = snap["commits"][0]
                    last_commit = {
                        "sha": first["sha"],
                        "created_at": first["date"],
                    }
            except Exception:
                pass
        if not last_commit:
            commits = gh(f"/repos/{owner}/{slug}/commits", {"per_page": 1})
            if commits:
                last_commit = {
                    "sha": commits[0]["sha"],
                    "created_at": commits[0]["commit"]["author"]["date"],
                }

        manifest = build_manifest(r, last_commit)
        body = json.dumps(manifest, ensure_ascii=False, indent=2).encode("utf-8")
        (out_dir / f"{slug}.json").write_bytes(body)
        drafted += 1
        print(f"  DRAFT {slug}", file=sys.stderr)

        if args.push:
            sha = existing.get("sha") if existing else None
            ok = put_file(owner, slug, branch, body, "chore(context): bootstrap PROJECT_CONTEXT.json", sha)
            if ok:
                pushed += 1
                print(f"    pushed {slug}", file=sys.stderr)
            else:
                failed += 1
                print(f"    FAIL {slug}", file=sys.stderr)
            time.sleep(0.2)

    print(f"\nSummary: drafted={drafted} skipped={skipped} pushed={pushed} failed={failed}", file=sys.stderr)
    print(f"Drafts in: {out_dir.resolve()}", file=sys.stderr)
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())