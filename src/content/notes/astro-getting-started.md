---
title: "Astro 项目结构备忘"
description: "Astro 项目的常用目录与约定。"
pubDate: 2025-09-05
topic: "前端"
tags: ["Astro", "前端"]
---

## 标准目录

```
src/
  pages/        # 路由 = 文件路径
  layouts/      # 通用布局
  components/   # 复用组件 (.astro / .tsx)
  content/      # 内容集合 (Markdown/MDX)
  styles/       # 全局样式
public/         # 直接拷贝到根目录
```

## 内容集合（Content Collections）

新版用 `defineCollection({ loader })`，比之前的 `type: 'content'` 更灵活。

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

## 岛屿架构

- `.astro` 默认是零 JS
- React 组件需要 `client:*` 指令才会被 hydration
  - `client:load` — 立刻 hydrate
  - `client:idle` — 浏览器空闲时
  - `client:visible` — 进入视口
  - `client:only="react"` — 不做 SSR（避免 hydration mismatch）
