import Link from "next/link";
import { NotionPage } from "@/src/components/NotionPage";
import { getNotionPageData } from "@/src/lib/notion";
import Footer from "@/src/components/layout/Footer";
import { DATA } from "@/src/data/resume";

export default async function WorkDetails({ params }) {
  const { slug } = await params;

  try {
    const work = DATA.projects.find((project) => project.slug === slug);

    if (!work) {
      throw new Error("Work item not found");
    }

    let recordMap = null;

    if (work.Notion_id && work.Notion_id !== "") {
      try {
        recordMap = await getNotionPageData(work.Notion_id);
      } catch (error) {
        console.error("Error fetching Notion page:", error);
      }
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-6 text-white">
              {work.title}
            </h1>
            {work.dates && (
              <p className="text-lg text-gray-400 mb-4">{work.dates}</p>
            )}
            {work.description && (
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                {work.description}
              </p>
            )}
            {work.technologies && work.technologies.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {work.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {work.Badge && work.Badge.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {work.Badge.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            {work.links && work.links.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {work.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {link.type}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* {work.image && (
            <div className="text-center mb-8">
              <Image
                src={work.image}
                alt={work.title}
                width={1000}
                height={0} // height will be auto-calculated
                className="max-h-[500px] w-auto h-auto rounded-lg mx-auto"
              />
            </div>
          )} */}

          {work.Notion_id && recordMap ? (
            <div className="notion-container mx-auto mt-8 rounded-3xl">
              <NotionPage recordMap={recordMap} rootPageId={work.Notion_id} />
            </div>
          ) : (
            <div className="p-8 bg-gray-50 text-center mx-auto mt-8 border border-gray-100 rounded-3xl">
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
        <div className="max-w-4xl mx-auto py-12">
          <Link
            href="/work"
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
