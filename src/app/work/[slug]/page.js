import Link from "next/link";
import { NotionPage } from "@/src/components/NotionPage";
import { getWorkBySlugFromKV } from "@/src/lib/kv";
import { getNotionPageData } from "@/src/lib/notion";
import Footer from "@/src/components/layout/Footer";

export default async function WorkDetails({ params }) {
  const { slug } = await params;

  try {
    // Fetch work details directly from KV instead of API
    const work = await getWorkBySlugFromKV(slug);

    if (!work) {
      throw new Error("Work item not found");
    }

    // Fetch notion data if pageId exists
    let recordMap = null;

    if (work.pageId && work.pageId !== "N/A") {
      try {
        recordMap = await getNotionPageData(work.pageId);
      } catch (error) {
        console.error("Error fetching Notion page:", error);
      }
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto  ">
          <div className="text-center mb-10">
            {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-6 text-black">
              {work.name || work.slug}
            </h1> */}
          </div>

          {work.pageId && recordMap ? (
            <div className="notion-container mx-auto mt-8">
              <NotionPage recordMap={recordMap} rootPageId={work.pageId} />
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center mx-auto mt-8 border border-gray-100">
              <p className="text-gray-700 text-lg mb-2">
                This is a private project with limited public details.
              </p>
              <p className="text-gray-600">
                For more information or to contribute, please reach out
                directly.
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
        <div className="max-w-4xl mx-auto  py-12 ">
          <Link
            href="/work"
            className="inline-flex items-center text-sm md:text-base font-medium bg-white/10 backdrop-blur-md rounded-full  py-2 border border-black/20 hover:bg-white/20 transition-all mb-8"
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
            Back
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 text-black">
              Error
            </h1>
            <p className="text-red-600 text-lg">
              {error.message || "Failed to load work details"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
