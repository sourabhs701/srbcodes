import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Get admin token from environment variables
 * @returns {string} Admin token
 */
export function getAdminToken() {
  const { env } = getCloudflareContext();
  return env.ADMIN_TOKEN;
}

/**
 * Verify if the provided token matches the admin token
 * @param {string} token - Token to verify
 * @returns {boolean} Whether the token is valid
 */
export function verifyToken(token) {
  const adminToken = getAdminToken();
  return token === adminToken;
}

/**
 * Middleware to verify admin authentication
 * @param {Request} request - The incoming request
 * @returns {Promise<boolean>} Whether the user is authenticated
 */
export async function verifyAdminAuth(request) {
  try {
    // Get token from cookies
    const cookies = request.headers.get("cookie") || "";
    const tokenCookie = cookies
      .split(";")
      .find((c) => c.trim().startsWith("adminToken="));

    if (!tokenCookie) {
      return false;
    }

    const token = tokenCookie.split("=")[1].trim();
    if (!token) {
      return false;
    }

    // Simple token verification
    return verifyToken(token);
  } catch (error) {
    console.error("Auth verification error:", error);
    return false;
  }
}
