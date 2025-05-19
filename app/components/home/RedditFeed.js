"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function RedditFeed({ username = "visionsrb", limit = 10 }) {
  const { data, error, isLoading } = useSWR(
    `/api/social/reddit-feed?username=${username}&limit=${limit}`,
    fetcher,
    { refreshInterval: 600000 } // Refresh every 10 minutes
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatScore = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score.toString();
  };

  // Function to truncate long text
  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Reddit Activity</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Check out my latest posts and discussions on Reddit.
          </p>
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500 dark:text-red-400">
                Failed to load Reddit posts. Please try again later.
              </p>
            </div>
          )}

          {data && data.posts && data.posts.length > 0 ? (
            <div className="space-y-4">
              {data.posts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        r/{post.subreddit}
                      </span>
                      <span className="block h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        Posted {formatDate(post.created_utc)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>

                    {post.selftext && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {truncateText(post.selftext)}
                      </p>
                    )}

                    {post.thumbnail && (
                      <div className="mt-4">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-auto max-w-full rounded"
                        />
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-orange-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{formatScore(post.score)}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{post.num_comments} comments</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring"
                      >
                        View on Reddit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">
                  No Reddit posts found for this user.
                </p>
              </div>
            )
          )}

          <div className="mt-12 text-center">
            <a
              href={`https://www.reddit.com/user/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-blue-600 px-8 py-3 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              <span className="text-sm font-medium">
                View Full Reddit Profile
              </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
