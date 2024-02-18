import { cacheTTL, directusUrl } from '@web/utils/config';

export type Author = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  description: string;
  location: string;
};

type QueryParams = {
  fields?: string[];
  limit?: number;
  ids?: string[];
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
export async function getAuthors({
  fields = [
    'id',
    'first_name',
    'last_name',
    'avatar',
    'description',
    'location',
  ],
  ids,
  limit,
  tags = ['directus/users'],
}: QueryParams = {}): Promise<Array<Author>> {
  const res = await fetch(`${directusUrl}/users`, {
    method: 'SEARCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        fields,
        filter: {
          ...(ids ? { id: { _in: ids } } : {}),
        },
        limit,
      },
    }),
    next: { revalidate: cacheTTL, tags },
  });

  const json = await res.json();

  return json.data.map((author: Author) => ({
    ...author,
    avatar: author.avatar ? `/directus-assets/${author.avatar}` : author.avatar,
  }));
}

export async function getAuthor(id: string): Promise<Author | null> {
  const data = await getAuthors({
    ids: [id],
    limit: 1,
    tags: [`directus/users/${id}`],
  });

  if (data.length === 0) {
    return null;
  }

  return data[0];
}
