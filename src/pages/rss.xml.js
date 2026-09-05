import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import SITE_CONFIG from '../../site.config';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: SITE_CONFIG.brand.name,
    description: SITE_CONFIG.seo.description,
    site: context.site,
    items: posts
      .sort((a, b) => +b.data.pubDate - +a.data.pubDate)
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/posts/${post.id}/`,
        categories: post.data.tags,
      })),
  });
}
