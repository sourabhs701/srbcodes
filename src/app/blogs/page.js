"use client";
import Footer from "@/src/components/layout/Footer";
import Loader from "@/src/components/layout/Loader";
import CategorySelector from "@/src/components/ui/CategorySelector";
import { DATA } from "@/src/data/blogs";
import { useState, useMemo } from "react";

const Page = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleExternalRedirect = (url) => {
    setPageLoading(true);
    // Open external URL in new window/tab
    window.open(url, "_blank", "noopener,noreferrer");
    // Reset loading state after a short delay
    setTimeout(() => setPageLoading(false), 500);
  };

  // Get all unique categories from blogs
  const categories = useMemo(() => {
    const allCategories = DATA.blogs
      .flatMap((blog) => blog.category || [])
      .filter(Boolean);
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories.sort()];
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") {
      return DATA.blogs;
    }
    return DATA.blogs.filter(
      (blog) => blog.category && blog.category.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <>
      {pageLoading && <Loader />}
      <div className="h-[200px] bg-black"></div>
      <div className="mx-2 md:mx-16 mb-16">
        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          filteredCount={filteredBlogs.length}
          totalCount={DATA.blogs.length}
          label="blog posts"
        />

        {/* All Blogs Section */}
        <div>
          {filteredBlogs.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-lg text-gray-500">
                No blog posts found in this category
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-8">
              {filteredBlogs.map((blog, index) => (
                <BlogLink
                  key={index}
                  blog={blog}
                  onClick={() => handleExternalRedirect(blog.redirect_url)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="pt-16">
        <Footer />
      </div>
    </>
  );
};

const BlogLink = ({ blog, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <a
      href={blog.redirect_url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-neutral-700 py-6 transition-colors duration-300 hover:border-neutral-50 cursor-pointer"
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-neutral-500 transition-colors duration-300 group-hover:text-neutral-50 md:text-3xl">
          {blog.title}
        </h2>

        <p className="text-base text-neutral-500 transition-colors duration-300 group-hover:text-neutral-50">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-neutral-600 group-hover:text-neutral-400">
          <span>{formatDate(blog.publishedAt)}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
          <span>•</span>
          {blog.category &&
            blog.category.map((cat, index) => (
              <span
                key={index}
                className="bg-neutral-800 px-2 py-1 rounded text-xs"
              >
                {cat}
              </span>
            ))}
        </div>
      </div>
    </a>
  );
};

export default Page;
