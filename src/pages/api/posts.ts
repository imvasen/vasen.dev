import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { directusUrl } from '@web/utils/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const posts = await axios.get(
    `${directusUrl}/items/posts?fields=id,title,slug`,
  );

  return res.status(200).json(posts.data);
}
