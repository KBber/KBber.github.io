# KBber 的项目与笔记

基于 Astro、TypeScript 和 React 的个人网站，部署在 GitHub Pages。

## 本地运行

```sh
npm ci
npm run dev
```

发布前运行：

```sh
npx astro check
npm run build
npm run preview
```

`dist/` 为生成文件，不直接编辑。

## 内容维护

- `src/data/projects.ts`：公开项目的名称、简介、技术和仓库链接。
- `src/data/project-cases.ts`：项目背景、实现过程、复核方式和当前边界。
- `src/data/home-projects.ts`：首页三个项目的展示文案与流程。
- `src/pages/projects/[slug].astro`：共用的项目案例模板。
- `src/content/`：文章、笔记和相册内容。
- `site.config.ts`：站点身份、导航与 SEO 信息。
- `assets/plates/`：已确认的金色素材与真实项目截图。
- `assets/fonts/`：本地字体和许可。
- `assets/projects/`：项目仓库中的展示图。
- `public/demos/finverify/`：使用合成数据的独立交互演示。

新增公开项目时同步维护项目信息和案例内容。项目描述应能从对应仓库复核，上游项目需写清贡献范围。页面使用公开账号名 KBber。

## 视觉与交互

深色底与古金色材质。首页展示具体项目，案例页采用较安静的阅读布局。项目由访客主动切换，背景动效支持暂停、减少动态效果，并在页面不可见时停止。

设计约定见 `DESIGN.md`。设计过程截图、浏览器配置与临时构建目录均不随站点发布。
