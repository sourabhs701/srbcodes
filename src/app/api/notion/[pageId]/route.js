import "server-only";
import { getNotionPageData } from "@/src/lib/notion";
import { getNotionPageFromKV, saveNotionPageToKV } from "@/src/lib/kv";

export async function GET(request, { params }) {
  const { pageId } = params;

  try {
    // Try to get data from KV first
    const cachedData = await getNotionPageFromKV(pageId);
    if (cachedData) {
      return new Response(JSON.stringify({ data: cachedData }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // If not in KV, get from Notion API
    const recordMap = await getNotionPageData(pageId);

    if (!recordMap) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Notion page" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Store in KV for future requests
    await saveNotionPageToKV(pageId, recordMap);

    // Return the data
    return new Response(JSON.stringify({ data: recordMap }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error fetching Notion page (${pageId}):`, error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Notion page" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
