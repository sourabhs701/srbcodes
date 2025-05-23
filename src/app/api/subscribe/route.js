import "server-only";
import { NextResponse } from "next/server";
import { saveSubscriberToKV, getSubscribersKV } from "@/src/lib/kv";

// Export the config for the API route
export const config = {
  runtime: "edge",
};

/**
 * POST /api/subscribe - Subscribe a user's email to the newsletter
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Extract IP address from Cloudflare context
    let ipAddress =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";

    // Handle comma-separated list of IPs (take the first one)
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }

    // Get KV namespace
    const kv = getSubscribersKV();

    // Check if email already exists in KV
    const existingSubscriber = await kv.get(email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Save subscriber to KV
    try {
      await saveSubscriberToKV(email, ipAddress);

      return NextResponse.json({
        success: true,
        message: "Successfully subscribed",
      });
    } catch (kvError) {
      console.error("Error saving subscriber to KV:", kvError);
      throw kvError;
    }
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
