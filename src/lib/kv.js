import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Get the KV namespace for subscribers
 * @returns {Object} KV namespace for subscribers
 */
export function getSubscribersKV() {
  const { env } = getCloudflareContext();
  if (!env || !env.SUBSCRIBERS_KV) {
    throw new Error("Missing SUBSCRIBERS_KV binding in environment variables");
  }

  return env.SUBSCRIBERS_KV;
}

/**
 * Save subscriber data to KV
 * @param {string} email - The subscriber's email address
 * @param {string} ipAddress - The subscriber's IP address
 * @returns {Promise<void>}
 */
export async function saveSubscriberToKV(email, ipAddress) {
  const kv = getSubscribersKV();
  const timestamp = new Date().toISOString();

  // Store the subscriber data with email as the key
  await kv.put(
    email,
    JSON.stringify({
      email,
      ipAddress,
      timestamp,
    })
  );
}
