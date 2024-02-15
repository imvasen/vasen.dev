import { notFound } from 'next/navigation';

import { getPostBySlug } from '@web/utils/posts';

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params: { slug } }: Props) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <main className='p-2 flex flex-col gap-2'>{post.content}</main>;
}
