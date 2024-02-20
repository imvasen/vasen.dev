import Image from 'next/image';

import React from 'react';

import Markdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import remarkCodeTitles from 'remark-flexible-code-titles';
import remarkGfm from 'remark-gfm';

import Pre from '@web/components/blog/Pre';
import type { Post } from '@web/utils/posts';

import './BlogPost.css';
import './prism.css';

type RehypeNode = {
  type: string;
  tagName?: string;
  properties?: { id?: string; className?: string };
  value?: string;
  children?: RehypeNode[];
};

type Props = {
  post: Post;
};

const components = {
  pre: Pre,
};

const tagColors = [
  'text-green-500',
  'text-blue-500',
  'text-yellow-500',
  'text-red-500',
  'text-indigo-500',
  'text-purple-500',
  'text-pink-500',
];

export default async function BlogPost({ post }: Props) {
  const datePosted = React.useMemo(() => {
    const today = new Date();
    const date = new Date(post.date_created);

    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
    });
    return dateString;
  }, [post.date_created]);

  return (
    <article className='max-w-4xl w-full bg-neutral-900 md:rounded'>
      <header className='mt-0'>
        <Image
          className='w-full h-96 object-cover md:rounded-t-md'
          src={post.cover_image}
          alt={post.title}
          width={800}
          height={600}
        />
        <section className='px-2 md:px-20 my-4'>
          <section className='flex flex-row gap-4 items-center mb-4'>
            <div
              className='overflow-hidden rounded-full'
              style={{ width: '40px', height: '40px' }}
            >
              <Image
                alt='Author Avatar'
                src={post.author.avatar}
                height={40}
                width={40}
              />
            </div>
            <div>
              <span>
                {post.author.first_name} {post.author.last_name}
              </span>
              <p className='text-sm text-neutral-500'>Posted on {datePosted}</p>
            </div>
          </section>
          <h1 className='text-4xl font-bold'>{post.title}</h1>
          {post.tags.length && (
            <section className='text-sm mt-2 flex gap-x-2 flex-wrap'>
              {post.tags.map((tag, i) => (
                <span
                  key={`tag:${i}`}
                  className={tagColors[i % tagColors.length]}
                >
                  #{tag.replace(/^#*/, '')}
                </span>
              ))}
            </section>
          )}
        </section>
      </header>
      <Markdown
        className='px-2 md:px-20 space-y-4'
        components={components}
        remarkPlugins={[remarkGfm, remarkCodeTitles]}
        rehypePlugins={[
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          [
            rehypeToc,
            {
              headings: ['h2', 'h3'],
              customizeTOC: (toc: RehypeNode) => {
                const tocHeading: RehypeNode = {
                  type: 'element',
                  tagName: 'h3',
                  properties: { id: 'toc', className: 'mb-2' },
                  children: [{ type: 'text', value: 'Table of Contents' }],
                };
                toc.children?.unshift(tocHeading);

                return toc;
              },
            },
          ],
        ]}
      >
        {post.content}
      </Markdown>
    </article>
  );
}
