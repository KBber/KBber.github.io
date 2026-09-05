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
    tagline: 'Hello, here is KBber',
    signature: "A small corner on the web — code, notes & quiet fragments.",
    bio: '记录学习与生活的数字角落。代码、笔记、摄影与偶尔的随想。',
  },

  /** Owner profile (used on Home and About) */
  profile: {
    displayName: 'KBber',
    realName: 'KBber',
    role: 'Student · Developer',
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
    accent: '#3B82F6',        // blue
    accentSoft: '#93C5FD',
    accentDeep: '#1E40AF',
  },

  /** Navigation order */
  nav: [
    { label: '首页', href: '/' },
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
      'KBber 的个人博客 — 记录学习、生活与代码。Articles, notes, moments and photos.',
    ogImage: '/assets/2.jpg',
    lang: 'zh-CN',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export default SITE_CONFIG;
