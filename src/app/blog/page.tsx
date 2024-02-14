import RevalidateButtons from '@web/components/RevalidateButtons';
import { getPosts } from '@web/utils/posts';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className='p-2 flex flex-col gap-2'>
      <RevalidateButtons />
      <section className='grid grid-cols-3'>
        {posts.data.map((post) => (
          <div
            className='border p-4 rounded hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer'
            key={post.id}
          >
            {post.title}
          </div>
        ))}
      </section>
    </main>
  );
}
