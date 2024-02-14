import { getPosts } from '@web/utils/posts';

export async function GET() {
  const posts = await getPosts();

  return Response.json(posts);
}
