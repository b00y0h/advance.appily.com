import type { Metadata } from 'next';

import type { Media, Page, Post } from '../../payload-types';
import { mergeOpenGraph } from './mergeOpenGraph';
import { mergeTwitter } from './mergeTwitter';

function hasFeaturedImage(doc: Page | Post): doc is Post {
  const result = 'postFeaturedImage' in doc;
  console.log("🚀 ~ hasFeaturedImage ~ result:", result)
  return result;
}

function isMedia(image: string | Media): image is Media {
  return typeof image === 'object' && image !== null && 'sizes' in image;
}


function getOgImageUrl(doc: Post): string | undefined {
  console.log("💩 ~ getOgImageUrl ~ doc.postFeaturedImage:", doc.postFeaturedImage)
  if (!doc.postFeaturedImage) return undefined;

  if (isMedia(doc.postFeaturedImage)) {
    console.log("💰 ~ getOgImageUrl ~ doc.postFeaturedImage:", doc.postFeaturedImage)
    return doc.postFeaturedImage.sizes?.squareMedium?.url || undefined;
  } else {
    console.log("💰💰 ~ getOgImageUrl ~ doc.postFeaturedImage:", doc.postFeaturedImage)
    return doc.postFeaturedImage;
  }
}

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL;
};


export const generateMeta = async (args: { doc: Page | Post}): Promise<Metadata> => {
  const { doc } = args || {}
  const baseUrl = getBaseUrl();

  let ogImage: string | undefined;

  if (hasFeaturedImage(doc)) {
    const ogImageUrl = getOgImageUrl(doc);
    console.log("🚀 ~ generateMeta ~ ogImageUrl:", ogImageUrl)
    if (ogImageUrl) {
      const ogParams = new URLSearchParams();
      ogParams.set('image', ogImageUrl);
      ogParams.set('title', doc.title);
      ogImage = `${baseUrl}/api/og?${ogParams.toString()}`;
      console.log("🚀🚀 ~ generateMeta ~ ogImage:", ogImage)
    }
  } else if (doc?.meta?.image && typeof doc.meta.image === 'object' && 'url' in doc.meta.image && doc.meta.image.url) {
    ogImage = doc.meta.image.url;
    console.log("🚀🚀🚀 ~ generateMeta ~ ogImage:", ogImage)
  }
  console.log("🚀🚀🚀🚀 ~ generateMeta ~ ogImage:", ogImage)

  const title = doc?.meta?.title || '';
  const description = doc?.meta?.description || '';
  const url = Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/';

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url,
        images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
    twitter: mergeTwitter({
      title,
      description,
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
