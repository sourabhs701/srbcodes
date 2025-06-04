"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("works"); // "works" or "subscribers"
  const [works, setWorks] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    image: "",
    year: "",
    pageId: "",
  });
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  // Fetch work items on load
  useEffect(() => {
    if (activeTab === "works") {
      fetchWorks();
    } else if (activeTab === "subscribers") {
      fetchSubscribers();
    }
  }, [activeTab]);

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

  // Fetch subscribers
  const fetchSubscribers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/subscribers", {
        credentials: "include",
      });

      // Redirect to login if unauthorized
      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSubscribers(data.data || []);
      } else {
        setError(data.error || "Failed to fetch subscribers");
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
    if (!formData.slug || !formData.title) {
      setError("Slug and Title are required fields");
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
          title: "",
          description: "",
          image: "",
          year: "",
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
      title: work.title || "",
      description: work.description || "",
      image: work.image || "",
      year: work.year || "",
      pageId: work.pageId || "",
    });
    setEditing(true);
    setShowForm(true);
    setError("");
    setSuccessMessage("");
  };

  // Handle delete button click
  const handleDelete = async (slug) => {
    if (!confirm(`Are you sure you want to delete ${slug}?`)) {
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

  // Handle delete subscriber
  const handleDeleteSubscriber = async (email) => {
    if (!confirm(`Are you sure you want to delete subscriber ${email}?`)) {
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `/api/admin/subscribers?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Subscriber deleted successfully!");
        fetchSubscribers(); // Refresh the list
      } else {
        setError(data.error || "Failed to delete subscriber");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("works")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "works"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Works
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "subscribers"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Subscribers
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 mb-6 bg-red-900/30 text-red-200 rounded border border-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-6 bg-green-900/30 text-green-200 rounded border border-green-700">
            {successMessage}
          </div>
        )}

        {/* Works Tab Content */}
        {activeTab === "works" && (
          <>
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setFormData({
                    slug: "",
                    title: "",
                    description: "",
                    image: "",
                    year: "",
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
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Refresh List
              </button>

              <Link
                href="/admin/dashboard/refresh"
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors"
              >
                Refresh All Notion Pages
              </Link>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  {editing ? "Edit Work Item" : "Add New Work Item"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Slug <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        URL-friendly identifier (e.g., my-project)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Notion Page ID
                      </label>
                      <input
                        type="text"
                        name="pageId"
                        value={formData.pageId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        Notion page ID for detailed content (optional)
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      {editing ? "Update Work" : "Add Work"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Work Items List */}
            <div className="bg-gray-800 shadow overflow-hidden rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Work Items</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Manage your portfolio works
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-4 text-gray-400">Loading...</div>
              ) : works.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  No work items found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Slug
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Year
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Updated
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {works.map((work) => (
                        <tr key={work.slug} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                            {work.slug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {work.title || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {work.year || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {work.updatedAt
                              ? new Date(work.updatedAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(work)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(work.slug)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Delete
                              </button>
                              {work.pageId && work.pageId !== "N/A" && (
                                <button
                                  onClick={() =>
                                    handleRefreshNotion(work.pageId)
                                  }
                                  className="text-green-400 hover:text-green-300"
                                >
                                  Refresh Notion
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Subscribers Tab Content */}
        {activeTab === "subscribers" && (
          <>
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={fetchSubscribers}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Refresh List
              </button>
            </div>

            {/* Subscribers List */}
            <div className="bg-gray-800 shadow overflow-hidden rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Subscribers</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Manage your newsletter subscribers
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-4 text-gray-400">Loading...</div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  No subscribers found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          IP Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {subscribers.map((subscriber) => (
                        <tr
                          key={subscriber.email}
                          className="hover:bg-gray-750"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {subscriber.ipAddress || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {subscriber.timestamp
                              ? new Date(
                                  subscriber.timestamp
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                handleDeleteSubscriber(subscriber.email)
                              }
                              className="text-red-400 hover:text-red-300"
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
          </>
        )}
      </div>
    </div>
  );
}
