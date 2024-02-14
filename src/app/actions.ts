'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateDirectusIndex() {
  revalidateTag('directus/index');
}

export async function revalidateDirectusPosts() {
  revalidateTag('directus/posts');
}
