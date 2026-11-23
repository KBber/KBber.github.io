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
    tagline: '项目与笔记',
    signature: '代码、实验记录和日常笔记。',
    bio: '我主要写 Python，做财报解析、文档问答和多轮对话相关的项目。',
  },

  /** Owner profile (used on Home and About) */
  profile: {
    displayName: 'KBber',
    realName: 'KBber',
    role: 'AI Engineer',
    location: 'Earth',
    avatar: '/assets/2.jpg',
    email: '',
    github: 'KBber',
  },

  /** Social links shown in footer / about */
  social: {
    github: 'https://github.com/KBber',
    email: '',
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
      'KBber 的个人网站。记录 Python 和 LLM 应用项目，也放文章、笔记和照片。',
    ogImage: '/assets/2.jpg',
    lang: 'zh-CN',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export default SITE_CONFIG;
