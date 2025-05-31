import "server-only";
import { getWorksFromKV, saveNotionPageToKV } from "@/src/lib/kv";
import { getNotionPageData } from "@/src/lib/notion";

/**
 * API endpoint to refresh Notion page data in KV cache
 * GET /api/notion/refresh - Refresh all Notion pages
 * GET /api/notion/refresh?pageId=xxx - Refresh specific Notion page
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");
    const refreshResults = [];

    // If pageId is provided, refresh just that page
    if (pageId) {
      const recordMap = await getNotionPageData(pageId);
      if (recordMap) {
        await saveNotionPageToKV(pageId, recordMap);
        refreshResults.push({ pageId, status: "refreshed" });
      } else {
        refreshResults.push({
          pageId,
          status: "failed",
          error: "Could not fetch page data",
        });
      }
    }
    // Otherwise refresh all pages
    else {
      // Get all works with pageIds
      const works = await getWorksFromKV();

      // Process each work with a valid pageId
      for (const work of works) {
        if (work.pageId && work.pageId !== "N/A") {
          try {
            const recordMap = await getNotionPageData(work.pageId);
            if (recordMap) {
              await saveNotionPageToKV(work.pageId, recordMap);
              refreshResults.push({
                pageId: work.pageId,
                slug: work.slug,
                status: "refreshed",
              });
            } else {
              refreshResults.push({
                pageId: work.pageId,
                slug: work.slug,
                status: "failed",
                error: "Could not fetch page data",
              });
            }
          } catch (error) {
            refreshResults.push({
              pageId: work.pageId,
              slug: work.slug,
              status: "failed",
              error: error.message,
            });
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        refreshed: refreshResults.filter((r) => r.status === "refreshed")
          .length,
        failed: refreshResults.filter((r) => r.status === "failed").length,
        results: refreshResults,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error refreshing Notion data:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
