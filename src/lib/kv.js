import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Get the KV namespace
 * @returns {Object} KV namespace
 */
export function getKV() {
  const { env } = getCloudflareContext();
  if (!env || !env.KV) {
    throw new Error("Missing KV binding in environment variables");
  }

  return env.KV;
}

/**
 * Save subscriber data to KV
 * @param {string} email - The subscriber's email address
 * @param {string} ipAddress - The subscriber's IP address
 * @returns {Promise<void>}
 */
export async function saveSubscriberToKV(email, ipAddress) {
  const kv = getKV();
  const timestamp = new Date().toISOString();

  // Get existing subscribers list
  const existingData = (await kv.get("subscribers", { type: "json" })) || [];

  // Add new subscriber if not already in the list
  if (!existingData.some((sub) => sub.email === email)) {
    existingData.push({
      email,
      ipAddress,
      timestamp,
    });
  }

  // Save the updated list
  await kv.put("subscribers", JSON.stringify(existingData));
}

/**
 * Get all works from KV
 * @returns {Promise<Array>} Array of work items
 */
export async function getWorksFromKV() {
  const kv = getKV();
  const works = await kv.get("works", { type: "json" });
  return works || [];
}

/**
 * Get a specific work by slug from KV
 * @param {string} slug - The work slug
 * @returns {Promise<Object|null>} Work item or null if not found
 */
export async function getWorkBySlugFromKV(slug) {
  const works = await getWorksFromKV();
  return works.find((work) => work.slug === slug) || null;
}

/**
 * Save work data to KV
 * @param {Array} works - Array of work objects
 * @returns {Promise<void>}
 */
export async function saveWorksToKV(works) {
  const kv = getKV();
  await kv.put("works", JSON.stringify(works));
}

/**
 * Save a single work to KV
 * @param {Object} work - Work object with slug and pageId
 * @returns {Promise<void>}
 */
export async function saveWorkToKV(work) {
  const works = await getWorksFromKV();

  // Find and update existing work or add new one
  const existingIndex = works.findIndex((w) => w.slug === work.slug);
  if (existingIndex >= 0) {
    // Only update slug and pageId, preserve createdAt
    works[existingIndex] = {
      slug: work.slug,
      pageId: work.pageId,
      createdAt: works[existingIndex].createdAt,
      updatedAt: new Date().toISOString(),
    };
  } else {
    // Only store the essential fields
    works.push({
      slug: work.slug,
      pageId: work.pageId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  await saveWorksToKV(works);
}

/**
 * Get Notion page data from KV
 * @param {string} pageId - Notion page ID
 * @returns {Promise<Object|null>} Notion record map or null if not found
 */
export async function getNotionPageFromKV(pageId) {
  const kv = getKV();
  return await kv.get(`notion:${pageId}`, { type: "json" });
}

/**
 * Save Notion page data to KV
 * @param {string} pageId - Notion page ID
 * @param {Object} recordMap - Notion record map
 * @param {number} expirationTtl - Cache expiration in seconds (default: 1 day)
 * @returns {Promise<void>}
 */
export async function saveNotionPageToKV(
  pageId,
  recordMap,
  expirationTtl = 86400
) {
  const kv = getKV();
  await kv.put(`notion:${pageId}`, JSON.stringify(recordMap), {
    expirationTtl,
  });
}
