import { cacheTTL, directusUrl } from '@web/utils/config';

type Post = {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  date_created: string;
  date_updated: string;
  content: string;
};

type QueryParams = {
  fields?: string[];
  limit?: number;
  status?: string;
  sort?: Array<
    | 'date_created'
    | 'date_updated'
    | '-date_created'
    | '-date_updated'
    | 'slug'
    | '-slug'
    | 'title'
    | '-title'
  >;
  slug?: string;
  tags?: Array<'directus/index' | 'directus/posts'>;
};

/**
 * T should be a subset of Post, according to the fields parameter.
 * @param fields The fields to return from the API.
 * @param limit The maximum number of posts to return.
 * @param slug The slug of the post to look for.
 * @param sort The sort order of the posts.
 * @param status The status of the posts to look for.
 * @param tags The tags to use for cache invalidation.
 * @returns The posts from the API.
 */
export async function getPosts<T = Omit<Post, 'content'>>({
  fields = ['slug', 'title', 'tags', 'date_created', 'date_updated'],
  limit,
  slug,
  sort = ['-date_updated', '-date_created'],
  status = 'published',
  tags = ['directus/index'],
}: QueryParams = {}): Promise<T[]> {
  const res = await fetch(`${directusUrl}/items/posts`, {
    method: 'SEARCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        fields,
        filter: {
          ...(status ? { status: { _eq: status } } : {}),
          ...(slug ? { slug: { _eq: slug } } : {}),
        },
        sort,
        limit,
      },
    }),
    next: { revalidate: cacheTTL, tags },
  });

  const json = await res.json();
  return json.data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await getPosts<Post>({
    fields: [
      'id',
      'title',
      'slug',
      'tags',
      'date_created',
      'date_updated',
      'content',
    ],
    slug,
    limit: 1,
    tags: ['directus/posts'],
  });

  if (data.length === 0) {
    return null;
  }

  return data[0];
}
