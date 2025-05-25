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
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:px-8 lg:px-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-handwritten mb-6 md:mb-8 text-black">
          Work
        </h1>
        <Separator className="mb-6 md:mb-10 bg-gray-300" />

        {isLoading ? (
          <div className="animate-pulse space-y-6 my-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 bg-gray-200 rounded w-full md:w-2/3 lg:w-1/2"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-600 rounded-lg shadow-sm my-8">
            <p className="font-medium text-lg">Failed to load work items</p>
          </div>
        ) : (
          <div className="my-8">
            <ol className="font-inter space-y-5 text-black">
              {works.map((work) => (
                <li
                  key={work.slug}
                  className="border-b pb-4 border-gray-100 last:border-b-0"
                >
                  <Link
                    href={`/${work.slug}`}
                    prefetch={true}
                    className="block group"
                  >
                    <h2 className="text-xl md:text-2xl font-medium hover:text-blue-600 transition-colors">
                      {work.slug}
                    </h2>
                    {work.description && (
                      <p className="text-gray-600 mt-2 text-base md:text-lg">
                        {work.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ol>

            {works.length === 0 && (
              <p className="text-lg text-gray-500 italic py-8">
                No work items available yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
