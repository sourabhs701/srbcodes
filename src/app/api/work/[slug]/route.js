import { getDbFromEnv } from "@/src/lib/db";
import { work } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import {
  getCachedData,
  setCachedData,
  createCachedResponse,
} from "@/src/lib/cache";

// Cache TTL in seconds (12 hours)
const CACHE_TTL = 43200;

export async function GET(request, { params }) {
  const { slug } = await params;
  const CACHE_KEY = `work_item_${slug}`;

  try {
    // Try to get data from cache first
    const cachedData = await getCachedData(CACHE_KEY);
    if (cachedData) {
      return createCachedResponse({ data: cachedData }, CACHE_TTL);
    }

    // If not in cache, get from database
    const db = getDbFromEnv();
    const workItem = await db.select().from(work).where(eq(work.slug, slug));

    if (!workItem || workItem.length === 0) {
      return createCachedResponse({ error: "Work item not found" }, 0, {
        status: 404,
      });
    }

    // Store in cache for future requests
    await setCachedData(CACHE_KEY, workItem[0], { expirationTtl: CACHE_TTL });

    // Return with cache headers
    return createCachedResponse({ data: workItem[0] }, CACHE_TTL);
  } catch (error) {
    console.error(`Error fetching work item (${slug}):`, error);
    return createCachedResponse({ error: error.message }, 0, { status: 500 });
  }
}
