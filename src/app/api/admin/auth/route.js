import "server-only";
import { verifyToken } from "@/src/lib/auth";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Token is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify the token
    const isValid = verifyToken(token);

    if (isValid) {
      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `adminToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid token",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Authentication failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
