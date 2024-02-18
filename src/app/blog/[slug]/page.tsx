import { notFound } from 'next/navigation';

import BlogPost from '@web/components/blog/BlogPost';
import { getPostBySlug } from '@web/utils/posts';

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params: { slug } }: Props) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className='p-0 md:p-2 flex flex-col gap-2 items-center'>
      <BlogPost post={post} />
    </main>
  );
}
