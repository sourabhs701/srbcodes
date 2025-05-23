"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Loading component for the Notion content
function NotionLoading() {
  return (
    <div className="p-8 bg-gray-100 rounded-lg text-center animate-pulse h-screen">
      <div className="h-20 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
    </div>
  );
}

// Dynamically import the NotionPage component
const NotionPage = dynamic(
  () => import("@/src/components/NotionPage").then((mod) => mod.NotionPage),
  {
    loading: () => <NotionLoading />,
    ssr: true, // This is valid in a client component
  }
);

export default function ClientNotionRenderer({
  recordMap,
  showTableOfContents,
  minTableOfContentsItems,
  previewImages,
}) {
  if (!recordMap) {
    return null;
  }

  return (
    <NotionPage
      recordMap={recordMap}
      showTableOfContents={showTableOfContents}
      minTableOfContentsItems={minTableOfContentsItems}
      previewImages={previewImages}
      components={{
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
}
