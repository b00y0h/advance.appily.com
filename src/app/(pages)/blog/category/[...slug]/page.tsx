'use client'
import { fetchCategoryIDByTitle, fetchPostsByCategory } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from '@/components/RichText';
import "@/styles/layouts/templates/BlogPage.scss";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Category, Post } from "../../../../../../payload-types";


export function CategoryComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategoryData] = useState<Category[]>([]);

  const slug = pathname?.split('/').pop();
  const decodedSlug = slug ? decodeURIComponent(slug) : '';
  const slugTitle = decodedSlug ? decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1) : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (decodedSlug) {
          const categoryData = await fetchCategoryIDByTitle(decodedSlug);
          setCategoryData(categoryData);
          if (categoryData) {
            const posts = await fetchPostsByCategory(categoryData[0]?.id);
            setPosts(posts);
          } else {
            router.push('/blog')
          }
        }
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [decodedSlug]);

  return (
    <div className="blog__landing blog-category__landing">
      <header className="blog__archive-header">
        <h1>{slugTitle}</h1>
      </header>
      <div className="blog__archive">
        {posts?.map(post => {
          const {
            slug,
            title,
            publishedDate,
            updatedAt,
            createdBy,
            richText,
            id
          } = post;

          return (
            <article key={id} className="post post__latest">
              <Link href={`../${slug}`}>
                <PostHeader
                  title={title}
                  createdBy={createdBy}
                  publishedDate={publishedDate}
                  updatedAt={updatedAt}
                />

                <RichText content={richText} extractFirstParagraph={true} />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryComponent;
