import "server-only";
import { saveWorkToKV, getWorksFromKV, saveWorksToKV } from "@/src/lib/kv";
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

// Get all work items
export async function GET(request) {
  try {
    // Check authentication
    const authError = await checkAuth(request);
    if (authError) return authError;

    // Get all works from KV
    const works = await getWorksFromKV();

    return new Response(
      JSON.stringify({
        success: true,
        data: works,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin work API:", error);
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

// Create or update a work item
export async function POST(request) {
  try {
    // Check authentication
    const authError = await checkAuth(request);
    if (authError) return authError;

    // Get work data from request
    const workData = await request.json();

    // Validate required fields
    if (!workData.slug || !workData.title) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Slug and title are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Save work data to KV with all fields
    await saveWorkToKV({
      slug: workData.slug,
      title: workData.title,
      description: workData.description || "",
      image: workData.image || "",
      year: workData.year || "",
      pageId: workData.pageId || "",
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Work item saved successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin work API:", error);
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

// Delete a work item
export async function DELETE(request) {
  try {
    // Check authentication
    const authError = await checkAuth(request);
    if (authError) return authError;

    // Get the slug from query parameters
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Slug is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get all works
    const works = await getWorksFromKV();

    // Filter out the work with the specified slug
    const newWorks = works.filter((work) => work.slug !== slug);

    // Check if a work was removed
    if (newWorks.length === works.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Work item not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Save the updated works list
    await saveWorksToKV(newWorks);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Work item deleted successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in admin work delete API:", error);
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
