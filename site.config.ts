/**
 * KBber's Blog — central configuration.
 *
 * Edit this file to update your site identity, links, and content metadata
 * without touching the components. All pages read from here.
 */
export const SITE_CONFIG = {
  /** Site identity */
  brand: {
    name: 'KBber',
    tagline: 'AI Engineer · Agents · LLMs · RL',
    signature: 'Run the experiment. Trust the numbers. Ship the thing.',
    bio: '围绕 Agent · LLM · 强化学习的工程作品集 — 把论文搬进能跑、可测、可上线的系统。',
  },

  /** Owner profile (used on Home and About) */
  profile: {
    displayName: 'KBber',
    realName: 'KBber',
    role: 'AI Engineer',
    location: 'Earth',
    avatar: '/assets/2.jpg',
    email: 'kbber@example.com',
    github: 'KBber',
  },

  /** Social links shown in footer / about */
  social: {
    github: 'https://github.com/KBber',
    email: 'mailto:kbber@example.com',
  },

  /** Hero greeting messages by time of day */
  greetings: {
    morning: '早安',
    noon: '午安',
    afternoon: '午后好',
    evening: '晚上好',
    night: '夜深了',
  },

  /** Brand color tokens (CSS variables consumed by global.css) */
  theme: {
    accent: '#06B6D4',        // cyan — agent / system
    accentSoft: '#67E8F9',
    accentDeep: '#0E7490',
  },

  /** Navigation order */
  nav: [
    { label: '首页', href: '/' },
    { label: '项目', href: '/projects' },
    { label: '文章', href: '/posts' },
    { label: '相册', href: '/albums' },
    { label: '随笔', href: '/moments' },
    { label: '笔记', href: '/notes' },
    { label: '关于', href: '/about' },
  ],

  /** Footer text */
  footer: {
    copyright: '© 2025 KBber',
    icp: '',
    poweredBy: 'Built with Astro + React',
  },

  /** SEO defaults */
  seo: {
    titleTemplate: '%s · KBber',
    description:
      'KBber 的个人主页 — AI Engineer，专注于 Agent 系统、LLM 应用工程（GraphRAG、Contextual RAG）与强化学习微调（GRPO / RLHF）。',
    ogImage: '/assets/2.jpg',
    lang: 'zh-CN',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export default SITE_CONFIG;