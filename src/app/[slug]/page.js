"use client";
import Link from "next/link";
import { NotionPage } from "@/src/components/NotionPage";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function WorkDetails({ params }) {
  const { slug } = params;

  // Fetch work details with SWR
  const {
    data: workData,
    error: workError,
    isLoading: workLoading,
  } = useSWR(`/api/work/${slug}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000, // 5 minutes
  });

  // Get the work item data
  const work = workData?.data || {};

  // Fetch notion data in parallel if pageId exists
  const {
    data: notionData,
    error: notionError,
    isLoading: notionLoading,
  } = useSWR(
    // Only fetch if pageId exists and is not "N/A"
    work.pageId && work.pageId !== "N/A" ? `/api/notion/${work.pageId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000, // 1 hour
    }
  );

  const recordMap = notionData?.data;
  const isLoading =
    workLoading || (work.pageId && work.pageId !== "N/A" && notionLoading);
  const hasError = workError || notionError;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-8 lg:px-12">
          <Link
            href="/work"
            className="inline-flex items-center text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors mb-8 sticky top-0 bg-white z-200"
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

          <div className="animate-pulse space-y-6">
            <div className="h-14 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-80 bg-gray-200 rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-8 lg:px-12">
          <Link
            href="/work"
            className="inline-flex items-center text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors mb-8 sticky top-0 bg-white z-200"
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
            <h1 className="text-4xl md:text-5xl font-bold font-handwritten mb-6 text-black">
              Error
            </h1>
            <p className="text-red-600 text-lg">Failed to load work details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:px-8 lg:px-12">
        <Link
          href="/work"
          className="inline-flex items-center text-sm md:text-base font-medium text-blue-600 rounded-full px-4 py-2 hover:text-blue-800 transition-colors mb-8 sticky top-0 bg-white z-200"
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

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-handwritten mb-6 text-black">
            {work.name}
          </h1>
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
              For more information or to contribute, please reach out directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
