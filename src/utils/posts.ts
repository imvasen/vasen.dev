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
  content: string;
}

export async function getPosts(): Promise<Omit<Post, 'content'>[]> {
  const res = await fetch(
    `${directusUrl}/items/posts?fields=${postFields.join(',')}`,
    {
      next: { revalidate: cacheTTL, tags: ['directus/index'] },
    },
  );

  const json = await res.json();
  return json.data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${directusUrl}/items/posts`, {
    method: 'SEARCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        filter: {
          slug: {
            _eq: slug,
          },
        },
      },
    }),
    next: { revalidate: cacheTTL, tags: ['directus/posts'] },
  });
  const json = await res.json();

  if (json.data.length !== 1) {
    return null;
  }

  return json.data[0];
}
