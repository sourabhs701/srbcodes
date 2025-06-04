import "server-only";
import { getSubscribersKV, deleteSubscriberFromKV } from "@/src/lib/kv";
import { verifyAdminAuth } from "@/src/lib/auth";

async function checkAuth(request) {
  const isAuthenticated = await verifyAdminAuth(request);
  if (!isAuthenticated) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Authentication required",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return null;
}

// Get all subscribers
export async function GET(request) {
  try {
    // Check authentication
    const authError = await checkAuth(request);
    if (authError) return authError;

    // Get all subscribers from KV
    const subscribers = await getSubscribersKV();

    return new Response(
      JSON.stringify({
        success: true,
        data: subscribers,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin subscribers API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Delete a subscriber
export async function DELETE(request) {
  try {
    // Check authentication
    const authError = await checkAuth(request);
    if (authError) return authError;

    // Get the email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Delete the subscriber
    const wasDeleted = await deleteSubscriberFromKV(email);

    if (!wasDeleted) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Subscriber not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscriber deleted successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin subscribers delete API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
