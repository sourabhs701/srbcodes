import "server-only";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/src/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
/**
 * Get a Drizzle DB instance from environment variables for API routes
 * @returns {Object} Drizzle DB instance
 */
export function getDbFromEnv() {
  const { env } = getCloudflareContext();
  if (!env || !env.DB) {
    throw new Error("Missing D1 database binding in environment variables");
  }

  return drizzle(env.DB, { schema });
}
