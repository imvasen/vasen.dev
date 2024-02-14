import { cacheTTL, directusUrl } from '@web/utils/config';

const postFields = [
  'id',
  'title',
  'slug',
  'tags',
  'date_created',
  'date_updated',
];

interface Post {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  date_created: string;
  date_updated: string;
}

export async function getPosts(): Promise<{ data: Post[] }> {
  const res = await fetch(
    `${directusUrl}/items/posts?fields=${postFields.join(',')}`,
    {
      next: { revalidate: cacheTTL, tags: ['directus/index'] },
    },
  );

  return res.json();
}
