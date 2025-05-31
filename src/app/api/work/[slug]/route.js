import "server-only";
import { getWorkBySlugFromKV } from "@/src/lib/kv";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // Get work item from KV
    const workItem = await getWorkBySlugFromKV(slug);

    if (!workItem) {
      return new Response(JSON.stringify({ error: "Work item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the data
    return new Response(JSON.stringify({ data: workItem }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error fetching work item (${slug}):`, error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
