import { NextApiRequest, NextApiResponse } from 'next';
import { cacheTTL, directusUrl } from '@web/utils/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const posts = await fetch(
    `${directusUrl}/items/posts?fields=id,title,slug,tags,date_created,date_updated`,
    { next: { revalidate: cacheTTL, tags: ['directus/index'] } },
  ).then((res) => res.json());

  return res.status(200).json(posts);
}
