import { getDbFromEnv } from "@/src/lib/db";
import { work } from "@/src/db/schema";
import {
  getCachedData,
  setCachedData,
  createCachedResponse,
} from "@/src/lib/cache";

// Cache TTL in seconds (12 hours)
const CACHE_TTL = 43200;
const CACHE_KEY = "work_list";

export async function GET() {
  try {
    // Try to get data from cache first
    const cachedData = await getCachedData(CACHE_KEY);
    if (cachedData) {
      return createCachedResponse({ data: cachedData }, CACHE_TTL);
    }

    // If not in cache, get from database
    const db = getDbFromEnv();
    const works = await db.select({ slug: work.slug }).from(work);

    // Store in cache for future requests
    await setCachedData(CACHE_KEY, works, { expirationTtl: CACHE_TTL });

    // Return with cache headers
    return createCachedResponse({ data: works }, CACHE_TTL);
  } catch (error) {
    console.error("Error in work API:", error);
    return createCachedResponse({ error: error.message }, 0, { status: 500 });
  }
}
