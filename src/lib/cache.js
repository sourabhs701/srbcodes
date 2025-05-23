import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Utility functions for working with Cloudflare KV cache
 */

/**
 * Get cached data from KV store
 * @param {string} key - Cache key
 * @param {Object} options - Options for cache retrieval
 * @returns {Promise<any>} - Cached data or null
 */
export async function getCachedData(key, options = { type: "json" }) {
  try {
    const { env } = getCloudflareContext();
    if (!env?.API_CACHE) return null;

    return await env.API_CACHE.get(key, options);
  } catch (error) {
    console.error(`Error reading from cache (${key}):`, error);
    return null;
  }
}

/**
 * Store data in KV cache
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {Object} options - Cache options including TTL
 * @returns {Promise<boolean>} - Success status
 */
export async function setCachedData(
  key,
  data,
  options = { expirationTtl: 300 }
) {
  try {
    const { env } = getCloudflareContext();
    if (!env?.API_CACHE) return false;

    const valueToStore = typeof data === "string" ? data : JSON.stringify(data);
    await env.API_CACHE.put(key, valueToStore, options);
    return true;
  } catch (error) {
    console.error(`Error writing to cache (${key}):`, error);
    return false;
  }
}

/**
 * Create a response with cache control headers
 * @param {any} data - Response data
 * @param {number} maxAge - Cache max age in seconds
 * @param {Object} options - Additional response options
 * @returns {NextResponse} - Response with cache headers
 */
export function createCachedResponse(data, maxAge = 300, options = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${maxAge}`,
      ...options.headers,
    },
    status: options.status || 200,
  });
}
