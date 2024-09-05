import type { Metadata } from 'next';

import type { Page, Post } from '../../payload-types';
import { mergeOpenGraph } from './mergeOpenGraph';
import { mergeTwitter } from './mergeTwitter';

function isPost(doc: Page | Post): doc is Post {
  return (doc as Post).postFeaturedImage !== undefined;
}

export const generateMeta = async (args: { doc: Page | Post}): Promise<Metadata> => {
  const { doc } = args || {}

  let ogImage: string | undefined;

  if (isPost(doc) && doc.postFeaturedImage) {
    const ogParams = new URLSearchParams();
    ogParams.set('image', doc.postFeaturedImage.sizes.squareMedium.url);
    ogParams.set('title', doc.title);
    ogImage = `/api/og?${ogParams.toString()}`;
    console.log("🚀 ~ generateMeta ~ ogImage:", ogImage)
  } else if (doc?.meta?.image && typeof doc.meta.image === 'object' && 'url' in doc.meta.image) {
    ogImage = `${doc.meta.image.url}`;
  }

  return {
    title: doc?.meta?.title || '',
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || '',
      description: doc?.meta?.description || '',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
    twitter: mergeTwitter({
      title: doc?.meta?.title || '',
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
