---
title: "GitHub Actions 部署到 gh-pages"
description: "用 GitHub Actions 自动构建 Astro 并发布到 gh-pages。"
pubDate: 2025-09-05
topic: "DevOps"
tags: ["GitHub Actions", "Astro", "CI"]
---

## 工作流

`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 20
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Settings 端

1. **Settings → Pages**：Source 选 *GitHub Actions*
2. 第一次 push 后会自动创建 `github-pages` environment
3. 之后每次 push `main` 都会自动部署

## 自定义域名

`astro.config.mjs` 里设 `site: 'https://yourdomain.com'`，然后把 `CNAME` 放到 `public/`。
