"use client";
import Footer from "@/src/components/layout/Footer";
import Loader from "@/src/components/layout/Loader";
import { DATA } from "@/src/data/blogs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = (href) => {
    setPageLoading(true);
    router.push(href);
  };

  const allBlogs = DATA.blogs;

  return (
    <>
      {pageLoading && <Loader />}
      <div className="h-[200px] bg-black"></div>
      <div className="mx-2 md:mx-16 mb-16">
        {/* All Blogs Section */}
        <div>
          {allBlogs.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-lg text-gray-500">No blog posts found</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-8">
              {allBlogs.map((blog) => (
                <BlogLink
                  key={blog.slug}
                  blog={blog}
                  onClick={() => handleNavigation(`/blogs/${blog.slug}`)}
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
      href={`/blogs/${blog.slug}`}
      onClick={handleClick}
      className="group block border-b border-neutral-700 py-6 transition-colors duration-300 hover:border-neutral-50"
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
          <span className="bg-neutral-800 px-2 py-1 rounded text-xs">
            {blog.category}
          </span>
        </div>
      </div>
    </a>
  );
};

export default Page;
