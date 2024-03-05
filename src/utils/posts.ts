import { Author, getAuthors } from '@web/utils/authors';
import { cacheTTL, directusUrl } from '@web/utils/config';

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date_created: string;
  date_updated: string;
  user_created: string;
  thumbnail: string;
  cover_image: string;
  content: string;
  author: Author;
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
  tags?: string[];
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
  fields = [
    'slug',
    'title',
    'tags',
    'description',
    'date_created',
    'date_updated',
    'user_created',
    'cover_image',
  ],
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

  const authorsMap = new Map<string, Author>();

  if (fields.includes('user_created') && json.data.length > 0) {
    const authorIds = [
      ...new Set<string>(json.data.map((post: Post) => post.user_created)),
    ];
    const authors = await getAuthors({ ids: authorIds });
    authors.forEach((author) => authorsMap.set(author.id, author));
  }

  for (const post of json.data) {
    post.author = authorsMap.get(post.user_created);
    post.thumbnail = post.thumbnail
      ? `/directus-assets/${post.thumbnail}`
      : post.thumbnail;
    post.cover_image = post.cover_image
      ? `/directus-assets/${post.cover_image}`
      : post.cover_image;
  }

  return json.data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await getPosts<Post>({
    fields: [
      'id',
      'title',
      'slug',
      'description',
      'tags',
      'date_created',
      'date_updated',
      'user_created',
      'cover_image',
      'thumbnail',
      'content',
    ],
    slug,
    limit: 1,
    tags: ['directus/posts', `directus/posts/${slug}`],
  });

  if (data.length === 0) {
    return null;
  }

  return data[0];
}
