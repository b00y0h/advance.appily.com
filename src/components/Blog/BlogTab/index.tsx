import { fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Post } from "../../../../payload-types";
import { PostHeader } from "../PostHeader";

const ALL_POST = 'All Posts';

const BlogTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(ALL_POST);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);


  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const allPosts = await fetchPosts();
      setFetchedPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPostsForCategory = async (tab) => {

    try {
      const posts = await fetchPostsByCategory(tab.id);
      setFetchedPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClick = async (tab) => {
    fetchPostsForCategory(tab);
    if (tab === ALL_POST) {
      setActiveTab(ALL_POST)
    } else {
      setActiveTab(tab.title);
    }
  };



  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };


  return (
    <div className="blog-filter__content">
      <div className="blog-filter__tabs">
        <button onClick={toggleCategories} className={`mobile-categories-btn ${categoriesOpen ? 'toggled' : ''}`}>Categories</button>
        <div className={`blog-categories ${categoriesOpen ? 'open' : ''}`}>
          <button
            className={`button-tab ${activeTab === ALL_POST ? 'button-tab__active' : ''}`}
            onClick={() => handleClick(ALL_POST)}
          >
            {ALL_POST}
          </button>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`button-tab ${activeTab === tab.title ? 'button-tab__active' : ''}`}
              onClick={() => handleClick(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="all-posts-container">
        {fetchedPosts?.map(post => {
          const { id, title, richText, createdBy, publishedDate, updatedAt, slug, category } = post;
          const catTitle = Array.isArray(category) && typeof category[0] === 'object' && 'title' in category[0]
            ? category[0]?.title ?? ''
            : '';
          return (
            <article key={id} className="post">
              <Link href={`blog/${catTitle}/${slug}`}>
                <PostHeader
                  title={title}
                  createdBy={createdBy}
                  publishedDate={publishedDate}
                  updatedAt={updatedAt}
                />
              </Link>
            </article>
          )
        }
        )}
      </div>
    </div>
  );
};

export default BlogTabs;
