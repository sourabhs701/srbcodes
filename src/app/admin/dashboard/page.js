"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    pageId: "",
  });
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  // Fetch work items on load
  useEffect(() => {
    fetchWorks();
  }, []);

  // Fetch work items
  const fetchWorks = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/work", {
        credentials: "include",
      });

      // Redirect to login if unauthorized
      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setWorks(data.data || []);
      } else {
        setError(data.error || "Failed to fetch work items");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate required fields
    if (!formData.slug || !formData.pageId) {
      setError("Slug and Page ID are required fields");
      return;
    }

    try {
      const response = await fetch("/api/admin/work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      // Redirect to login if unauthorized
      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          editing
            ? "Work item updated successfully!"
            : "Work item added successfully!"
        );
        setFormData({
          slug: "",
          pageId: "",
        });
        setShowForm(false);
        setEditing(false);
        fetchWorks(); // Refresh the list
      } else {
        setError(data.error || "Failed to save work item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  // Handle edit button click
  const handleEdit = (work) => {
    setFormData({
      slug: work.slug || "",
      pageId: work.pageId || "",
    });
    setEditing(true);
    setShowForm(true);
    setError("");
    setSuccessMessage("");
  };

  // Handle delete button click
  const handleDelete = async (slug) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) {
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/admin/work?slug=${slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      // Redirect to login if unauthorized
      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Work item deleted successfully!");
        fetchWorks(); // Refresh the list
      } else {
        setError(data.error || "Failed to delete work item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  // Handle refresh Notion data
  const handleRefreshNotion = async (pageId) => {
    if (!pageId || pageId === "N/A") {
      setError("No valid Notion page ID to refresh");
      return;
    }

    try {
      const response = await fetch(`/api/notion/refresh?pageId=${pageId}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Notion page refreshed successfully!`);
      } else {
        setError(data.error || "Failed to refresh Notion data");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Messages */}
        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-6 bg-green-50 text-green-700 rounded border border-green-200">
            {successMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => {
              setFormData({
                slug: "",
                pageId: "",
              });
              setEditing(false);
              setShowForm(!showForm);
              setError("");
              setSuccessMessage("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {showForm ? "Cancel" : "Add New Work"}
          </button>

          <button
            onClick={fetchWorks}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Refresh List
          </button>

          <Link
            href="/admin/dashboard/refresh"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Refresh All Notion Pages
          </Link>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Work Item" : "Add New Work Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    pattern="[a-z0-9-]+"
                    title="Lowercase letters, numbers, and hyphens only"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lowercase letters, numbers, and hyphens only
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page ID
                  </label>
                  <input
                    type="text"
                    name="pageId"
                    value={formData.pageId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editing ? "Update Work Item" : "Add Work Item"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Work Items List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold p-6 border-b">Work Items</h2>

          {isLoading ? (
            <div className="p-6 text-center">Loading work items...</div>
          ) : works.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No work items found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notion Page ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {works.map((work) => (
                    <tr key={work.slug} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{work.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {work.pageId && work.pageId !== "N/A" ? (
                            <span className="flex items-center">
                              {work.pageId.substring(0, 10)}...
                              <button
                                onClick={() => handleRefreshNotion(work.pageId)}
                                className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                                title="Refresh Notion data"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                              </button>
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(work)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(work.slug)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
