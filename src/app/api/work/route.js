import "server-only";
import { getWorksFromKV } from "@/src/lib/kv";

export async function GET() {
  try {
    // Get work data from KV storage
    const works = await getWorksFromKV();

    // Return the data
    return new Response(JSON.stringify({ data: works }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in work API:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
