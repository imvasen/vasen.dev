import { notFound } from 'next/navigation';

import { Metadata } from 'next';

import BlogPost from '@web/components/blog/BlogPost';
import { getPostBySlug } from '@web/utils/posts';
import { track } from '@web/utils/track';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, description } = post;

  return {
    title,
    description,
    metadataBase: new URL('https://www.vasen.dev/'),
    authors: [
      {
        name: 'Hector Vasquez',
        url: 'https://www.vasen.dev',
      },
    ],
    category: 'Technology',
    creator: 'Hector Vasquez',
    keywords: post.tags,
    openGraph: {
      title: `${title} | Hector Vasquez`,
      description,
      type: 'article',
      images: post.thumbnail,
      siteName: 'vasen.dev',
      url: `https://www.vasen.dev/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params: { slug } }: Props) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  await track('Page Viewed', {
    page: 'Blog Post',
    subject: 'Blog',
    title: post.title,
    slug: post.slug,
  });

  return (
    <main className='p-0 md:p-2 flex flex-col gap-2 items-center'>
      <BlogPost post={post} />
    </main>
  );
}
