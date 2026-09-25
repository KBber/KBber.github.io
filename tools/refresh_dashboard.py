"""
Refresh dashboard snapshot data for KBber.github.io.

Reads KBber's repo list from the GitHub REST API, gathers per-repo
metadata (commits, branches, issues, CI status, contributors), and
writes:
  src/data/projects.json        -- list of repo summaries
  src/data/snapshots/<slug>.json -- per-repo detail

Designed to run both locally on Windows and in GitHub Actions (Ubuntu).
Stdlib-only + `requests` (already in deps). Token from $GITHUB_TOKEN or
$GH_TOKEN env var, or the GH_TOKEN file at repo root.

Usage:
  python tools/refresh_dashboard.py [--out <repo-root>] [--per-repo 20]
"""
from __future__ import annotations

import argparse
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
    "User-Agent": "kbber-dashboard-snapshot",
    "X-GitHub-Api-Version": "2022-11-28",
}
if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"
S = requests.Session()
S.headers.update(HEADERS)


def gh(path: str, params: dict | None = None, retries: int = 3) -> Any:
    url = f"{API}{path}"
    last = None
    for i in range(retries):
        try:
            r = S.get(url, params=params, timeout=30)
            if r.status_code == 403 and r.headers.get("X-RateLimit-Remaining") == "0":
                reset = int(r.headers.get("X-RateLimit-Reset", time.time() + 30))
                wait = max(5, reset - int(time.time()) + 2)
                print(f"  rate-limited, sleeping {wait}s", file=sys.stderr)
                time.sleep(wait)
                continue
            if r.status_code == 404:
                return None
            if r.status_code >= 500:
                last = f"HTTP {r.status_code}"
                time.sleep(2 ** i)
                continue
            if r.status_code == 200:
                return r.json()
            last = f"HTTP {r.status_code}: {r.text[:200]}"
        except Exception as e:
            last = f"EXC {type(e).__name__}: {e}"
            time.sleep(2 ** i)
    print(f"  gh({path}) failed: {last}", file=sys.stderr)
    return None


def list_repos() -> list[dict]:
    repos = []
    page = 1
    while True:
        chunk = gh("/users/KBber/repos", {"per_page": 100, "page": page, "sort": "pushed"})
        if not chunk:
            break
        repos.extend(chunk)
        if len(chunk) < 100:
            break
        page += 1
    return repos


def get_commits(owner: str, repo: str, per_page: int = 20) -> list[dict]:
    return gh(f"/repos/{owner}/{repo}/commits", {"per_page": per_page}) or []


def get_branches(owner: str, repo: str) -> list[dict]:
    return gh(f"/repos/{owner}/{repo}/branches", {"per_page": 30}) or []


def get_issues(owner: str, repo: str) -> list[dict]:
    issues = gh(f"/repos/{owner}/{repo}/issues", {"per_page": 5, "state": "open"}) or []
    return [i for i in issues if "pull_request" not in i]


def get_actions(owner: str, repo: str) -> list[dict]:
    return gh(f"/repos/{owner}/{repo}/actions/runs", {"per_page": 5}) or []


def get_contributors(owner: str, repo: str) -> list[dict]:
    return gh(f"/repos/{owner}/{repo}/contributors", {"per_page": 8}) or []


def get_languages(owner: str, repo: str) -> dict[str, int]:
    return gh(f"/repos/{owner}/{repo}/languages") or {}


def get_release(owner: str, repo: str) -> list[str]:
    rel = gh(f"/repos/{owner}/{repo}/releases", {"per_page": 5}) or []
    return [r.get("tag_name") for r in rel if r.get("tag_name")]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default=".", help="Repo root (defaults to cwd)")
    parser.add_argument("--per-repo", type=int, default=20, help="Commits per repo")
    parser.add_argument(
        "--include-forks",
        action="store_true",
        help="Include fork repos (default: skip forks)",
    )
    parser.add_argument(
        "--skip",
        nargs="*",
        default=["TrendRadar"],  # archived / unrelated
        help="Repo slugs to skip",
    )
    args = parser.parse_args()

    root = Path(args.out).resolve()
    data_dir = root / "src" / "data"
    snaps_dir = data_dir / "snapshots"
    snaps_dir.mkdir(parents=True, exist_ok=True)

    repos = list_repos()
    print(f"Found {len(repos)} repos", file=sys.stderr)

    summaries: list[dict] = []
    skipped = 0
    for r in repos:
        slug = r["name"]
        if slug in args.skip:
            skipped += 1
            continue
        if r.get("fork") and not args.include_forks:
            skipped += 1
            continue
        owner = r["owner"]["login"]
        summary = {
            "id": r["id"],
            "name": r["name"],
            "slug": slug,
            "description": r.get("description"),
            "html_url": r["html_url"],
            "default_branch": r["default_branch"],
            "language": r.get("language"),
            "stargazers_count": r.get("stargazers_count", 0),
            "watchers_count": r.get("watchers_count", 0),
            "forks_count": r.get("forks_count", 0),
            "open_issues_count": r.get("open_issues_count", 0),
            "pushed_at": r["pushed_at"],
            "updated_at": r["updated_at"],
            "fork": r.get("fork", False),
            "archived": r.get("archived", False),
            "has_pages": r.get("has_pages", False),
            "has_actions": bool((gh(f"/repos/{owner}/{slug}/actions/workflows") or []).get("total_count", 0)),
            "topics": r.get("topics", []),
        }
        summaries.append(summary)

    summaries.sort(key=lambda x: x["pushed_at"], reverse=True)

    (data_dir / "projects.json").write_text(
        json.dumps(summaries, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Wrote projects.json ({len(summaries)} repos, {skipped} skipped)", file=sys.stderr)

    # Per-repo snapshots
    for s in summaries:
        owner, slug = "KBber", s["slug"]
        print(f"  snapshot {slug}...", file=sys.stderr)
        commits = get_commits(owner, slug, args.per_repo)
        branches = get_branches(owner, slug)
        issues = get_issues(owner, slug)
        actions = get_actions(owner, slug)
        contributors = get_contributors(owner, slug)
        languages = get_languages(owner, slug)
        releases = get_release(owner, slug)

        snap = {
            "repo": s,
            "commits": [
                {
                    "sha": c["sha"],
                    "short_sha": c["sha"][:7],
                    "message": c["commit"]["message"],
                    "author": {
                        "name": c["commit"]["author"]["name"],
                        "email": (c["commit"]["author"]["email"] or "").lower(),
                    },
                    "date": c["commit"]["author"]["date"],
                    "html_url": c["html_url"],
                }
                for c in commits
            ],
            "branches": [
                {"name": b["name"], "protected": b.get("protected", False)}
                for b in branches
            ],
            "issues": [
                {
                    "number": i["number"],
                    "title": i["title"],
                    "labels": [l["name"] for l in i.get("labels", [])],
                    "updated_at": i["updated_at"],
                    "html_url": i["html_url"],
                }
                for i in issues
            ],
            "actions": [
                {
                    "id": a["id"],
                    "name": a["name"],
                    "status": a["status"],
                    "conclusion": a.get("conclusion"),
                    "event": a["event"],
                    "branch": a.get("head_branch"),
                    "created_at": a["created_at"],
                    "html_url": a["html_url"],
                }
                for a in (actions.get("workflow_runs", []) if isinstance(actions, dict) else [])
            ],
            "contributors": [
                {
                    "login": c.get("login", ""),
                    "name": c.get("name"),
                    "avatar_url": c.get("avatar_url"),
                    "contributions": c.get("contributions", 0),
                }
                for c in contributors
            ],
            "languages": languages,
            "releases": releases,
            "snapshot_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }

        (snaps_dir / f"{slug}.json").write_text(
            json.dumps(snap, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        # Light rate-limit courtesy
        time.sleep(0.05)

    print(f"Wrote {len(summaries)} snapshots under {snaps_dir}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())