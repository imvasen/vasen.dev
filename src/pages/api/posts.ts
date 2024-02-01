import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getFlerkenIp } from '@web/utils/flerken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const flerkenIp = await getFlerkenIp();
  const posts = await axios.get(
    `http://${flerkenIp}:8055/items/posts?fields=id,title,slug`,
  );

  return res.status(200).json(posts.data);
}
