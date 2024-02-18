import { revalidateTag } from 'next/cache';

export async function PATCH(req: Request) {
  const { tags } = await req.json();

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return Response.json({ tags });
}
