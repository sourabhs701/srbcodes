import notion from "@/src/lib/notion";
import {
  getCachedData,
  setCachedData,
  createCachedResponse,
} from "@/src/lib/cache";

// Cache TTL in seconds (12 hours)
const CACHE_TTL = 43200;

export async function GET(request, { params }) {
  const { pageId } = await params;
  const CACHE_KEY = `notion_page_${pageId}`;

  try {
    // Try to get data from cache first
    const cachedData = await getCachedData(CACHE_KEY);
    if (cachedData) {
      return createCachedResponse({ data: cachedData }, CACHE_TTL);
    }

    // If not in cache, get from Notion API
    const recordMap = await notion.getPage(pageId);

    // Store in cache for future requests
    await setCachedData(CACHE_KEY, recordMap, { expirationTtl: CACHE_TTL });

    // Return with cache headers
    return createCachedResponse({ data: recordMap }, CACHE_TTL);
  } catch (error) {
    console.error(`Error fetching Notion page (${pageId}):`, error);
    return createCachedResponse({ error: "Failed to fetch Notion page" }, 0, {
      status: 500,
    });
  }
}
