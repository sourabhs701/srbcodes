"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RefreshAllNotion() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRefreshAll = async () => {
    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch("/api/notion/refresh", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || "Failed to refresh Notion pages");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold">Refresh Notion Pages</h1>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={handleRefreshAll}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Refreshing..." : "Refresh All Notion Pages"}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Refresh Results</h2>
              <p className="mt-2 text-gray-600">
                {results.refreshed} page(s) refreshed successfully,{" "}
                {results.failed} failed
              </p>
            </div>

            {results.results.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Error
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.results.map((result, index) => (
                      <tr
                        key={index}
                        className={
                          result.status === "failed" ? "bg-red-50" : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {result.pageId
                              ? result.pageId.substring(0, 12) + "..."
                              : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {result.slug || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              result.status === "refreshed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {result.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-red-500">
                            {result.error || ""}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
