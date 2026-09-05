# KBber's Blog

Personal blog of **KBber** — built with **Astro + React**, deployed to **GitHub Pages**.

🌐 Live: <https://kbber.github.io>

## ✨ Features

- **Liquid Glass** UI — `backdrop-filter` based translucent surfaces
- **Light / Dark / System** theme switcher
- **Animated hero** — live clock + greeting + IP-based weather
- **Draggable magnetic cards** on the home page (vanilla pointer events, no GSAP)
- **Reading progress bar** on article pages
- **Photo lightbox** for albums with keyboard navigation
- **View transitions** for smooth page changes
- **Markdown content collections** — posts, notes, moments, albums

## 🗂 Sections

| Section | Path | Source |
|---|---|---|
| 首页 Home | `/` | — |
| 文章 Posts | `/posts` | `src/content/posts/*.md` |
| 相册 Albums | `/albums` | `src/content/albums/*.json` |
| 随笔 Moments | `/moments` | `src/content/moments/*.md` |
| 笔记 Notes | `/notes` | `src/content/notes/*.md` |
| 关于 About | `/about` | — |

## 🚀 Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # preview the built site
```

## ⚙️ Configuration

All identity, theme tokens, nav order, and social links live in **`site.config.ts`** — edit that file to make it yours.

## 🚢 Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site with Astro and publishes the `dist/` folder to GitHub Pages.

- Settings → Pages → Source: **GitHub Actions**
- Workflow file: `.github/workflows/deploy.yml`

## 📁 Project structure

```
.
├── .github/workflows/deploy.yml   # Auto-deploy
├── astro.config.mjs               # Astro + sitemap config
├── site.config.ts                 # Central config (you!)
├── public/
│   ├── assets/                    # Existing images
│   ├── bricks.svg
│   └── favicon.svg
└── src/
    ├── components/                # Astro + React components
    ├── content.config.ts          # Content collections
    ├── content/                   # Markdown / JSON for posts, notes, moments, albums
    ├── layouts/BaseLayout.astro
    ├── pages/                     # Routes
    └── styles/global.css
```

## 🪪 License

MIT — feel free to fork, learn, and remix.
