// src/lib/db.js
import "server-only";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

/**
 * Get a DrizzleORM client connected to the D1 database
 * @param {import("@cloudflare/workers-types").D1Database} d1
 * @returns {import("drizzle-orm/d1").D1Database<typeof schema>}
 */
export function getDb(d1) {
  if (!d1) {
    throw new Error(
      "D1 database is not available. Check wrangler.jsonc configuration."
    );
  }
  return drizzle(d1, { schema });
}

/**
 * Create a database client from the Cloudflare Workers environment context
 * @param {Object} context - The Cloudflare Workers environment context
 * @returns {import("drizzle-orm/d1").D1Database<typeof schema>}
 */
export function getDbFromContext(context) {
  if (!context.env.DB) {
    throw new Error(
      "DB binding not found in environment. Check wrangler.jsonc configuration."
    );
  }
  return getDb(context.env.DB);
}
