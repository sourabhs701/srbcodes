import "server-only";
import { saveSubscriberToKV } from "@/src/lib/kv";

// Export the config for the API route
export const config = {
  runtime: "edge",
};

/**
 * POST /api/subscribe - Subscribe a user's email to the newsletter
 */
export async function POST(request) {
  try {
    // Get the request data
    const requestData = await request.json();
    const { email } = requestData;

    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Valid email is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get IP address from CF request
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";

    // Save subscriber to KV
    await saveSubscriberToKV(email, ipAddress);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscription successful",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in subscribe API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Subscription failed. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
