import Link from "next/link";
import { NotionPage } from "@/src/components/NotionPage";
import { getNotionPageData } from "@/src/lib/notion";
import Footer from "@/src/components/layout/Footer";
import { DATA } from "@/src/data/blogs";

export default async function BlogDetails({ params }) {
  const { slug } = await params;

  try {
    const blog = DATA.blogs.find((blog) => blog.slug === slug);

    if (!blog) {
      throw new Error("Blog post not found");
    }

    let recordMap = null;

    if (blog.notion_id && blog.notion_id !== "") {
      try {
        recordMap = await getNotionPageData(blog.notion_id);
      } catch (error) {
        console.error("Error fetching Notion page:", error);
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-6 text-white">
              {blog.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-6 text-gray-400">
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
              <span>•</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>
            </div>

          </div>

          {blog.notion_id && recordMap ? (
            <div className="notion-container mx-auto mt-8 rounded-3xl">
              <NotionPage recordMap={recordMap} rootPageId={blog.notion_id} />
            </div>
          ) : (
            <div className="p-8 bg-gray-50 text-center mx-auto mt-8 border border-gray-100 rounded-3xl">
              <p className="text-gray-700 text-lg mb-2">
                This blog post is currently being prepared.
              </p>
              <p className="text-gray-600">
                Content will be available soon. Please check back later.
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm md:text-base font-medium bg-white/10 backdrop-blur-md rounded-full py-2 border border-black/20 hover:bg-white/20 transition-all mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 text-black">
              Blog Post Not Found
            </h1>
            <p className="text-red-600 text-lg">
              {error.message || "The requested blog post could not be found"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
