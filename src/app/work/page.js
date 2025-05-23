"use client";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Work() {
  // Use SWR for data fetching with caching
  const { data, error, isLoading } = useSWR("/api/work", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000, // 5 minutes
  });

  const works = data?.data || [];

  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
        <h1 className="text-8xl font-bold font-handwritten mb-8">Work</h1>
        <Separator className="mb-8 bg-gray-300" />

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-1/3"></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-500 rounded">
            Failed to load work items
          </div>
        ) : (
          <ol className="font-inter font-medium space-y-2 p-2 underline">
            {works.map((work) => (
              <li key={work.slug}>
                <h2>
                  <Link href={`/work/${work.slug}`} prefetch={true}>
                    {work.slug}
                  </Link>
                </h2>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
