import Link from 'next/link';

import { getPosts } from '@web/utils/posts';
import { track } from '@web/utils/track';

export default async function Blog() {
  await track('Page Viewed', {
    page: 'Blog (home)',
    subject: 'Blog',
  });

  const posts = await getPosts();

  return (
    <main className='p-2 flex flex-col gap-2'>
      <section className='flex flex-col gap-2'>
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className='flex flex-col p-4 rounded text-green-400 hover:shadow-lg transition-all cursor-pointer hover:text-green-500'>
              <h2 className='text-xl font-bold mb-2'>{post.title}</h2>

              <p className='mb-1 text-sm'>
                {new Date(
                  post.date_updated || post.date_created,
                ).toLocaleDateString()}
              </p>

              <section className='flex gap-1'>
                {post.tags.map((tag) => (
                  <span
                    className='border rounded border-green-500 text-sm px-1'
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </section>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
