"use client";
import { fetchCategoryIDByTitle, fetchPostsByCategory } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import "@/styles/layouts/templates/BlogPage.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Post } from "../../../../../payload-types";

export function CategoryComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategoryData] = useState<Category[]>([]);

  const slug = pathname?.split("/").pop();
  const removeHyphen = slug?.replace(/-/g, " ");
  const slugTitle = removeHyphen
    ? removeHyphen.charAt(0).toUpperCase() + removeHyphen.slice(1)
    : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const categoryData = await fetchCategoryIDByTitle(slug);
          setCategoryData(categoryData);
          if (categoryData.length > 0) {
            const posts = await fetchPostsByCategory(categoryData[0]?.id);
            setPosts(posts);
          } else {
            router.push("/blog");
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [slug, router]);

  return (
    <div className="blog__landing blog-category__landing">
      <header className="blog__archive-header">
        <h1>{slugTitle}</h1>
      </header>
      <div className="blog__archive">
        {posts?.map((post) => {
          const {
            slug,
            title,
            publishedDate,
            updatedAt,
            createdBy,
            richText,
            id,
          } = post;

          const href = `${window.location.origin}/blog/${slugTitle}/${slug}`;
          return (
            <article key={id} className="post post__latest">
              <Link href={href}>
                <PostHeader
                  title={title}
                  createdBy={createdBy}
                  publishedDate={publishedDate}
                  updatedAt={updatedAt}
                />

                <RichText content={richText} extractFirstParagraph={true} />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryComponent;
