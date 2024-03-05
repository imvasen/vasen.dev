import { MetadataRoute } from 'next';

import { siteUrl } from '@web/utils/config';
import { getPosts } from '@web/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    {
      url: `${siteUrl}/blog`,
      lastModified: posts.length ? posts[0].date_updated : new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date_updated,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ] as MetadataRoute.Sitemap;
}
