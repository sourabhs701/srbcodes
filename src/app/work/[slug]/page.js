"use client";
import Link from "next/link";
import { NotionPage } from "@/src/components/NotionPage";
import { useState, useEffect } from "react";
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
      <div className="min-h-screen relative">
        <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-2/3"></div>
            <div className="flex gap-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen relative">
        <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-handwritten mb-8">
            Error
          </h1>
          <p className="text-red-500">Failed to load work details</p>
          <Link href="/work" className="underline mt-4 inline-block">
            ← Back to work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-handwritten">
          {work.name}
        </h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          {work.github_url && work.github_url !== "N/A" && (
            <Link
              href={work.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 "
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          {work.live_url && work.live_url !== "N/A" && (
            <Link
              href={work.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          )}
        </div>
      </div>
      {work.pageId && work.pageId !== "N/A" && recordMap ? (
        <div className="notion-container max-w-4xl mx-auto">
          <NotionPage recordMap={recordMap} rootPageId={work.pageId} />
        </div>
      ) : (
        <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg text-center max-w-4xl mx-auto">
          <p className="text-gray-600 dark:text-gray-300">
            {work.pageId && work.pageId !== "N/A"
              ? "Loading Notion content..."
              : "This is a private project, so the Notion page is not available."}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            If you want to see/contribute to the project, please contact me.
          </p>
        </div>
      )}
    </div>
  );
}
