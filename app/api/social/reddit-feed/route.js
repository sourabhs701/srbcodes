/**
 * API route for fetching posts from a specific Reddit user
 *
 * Sample response format:
 * {
 *   posts: [
 *     {
 *       id: "string",
 *       title: "string",
 *       subreddit: "string",
 *       author: "string",
 *       permalink: "string",
 *       url: "string",
 *       thumbnail: "string" | null,
 *       score: number,
 *       num_comments: number,
 *       created_utc: number,
 *     }
 *   ]
 * }
 */

export const runtime = "edge";

export async function GET(req) {
  try {
    // Get username from query params, default to 'visionsrb'
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || "visionsrb";
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Ensure limit is between 1 and 25 for reasonable response size
    const validLimit = Math.min(Math.max(limit, 1), 25);

    // Fetch user posts from Reddit API
    const redditUrl = `https://www.reddit.com/user/${username}/submitted.json?limit=${validLimit}`;
    const response = await fetch(redditUrl, {
      headers: {
        "User-Agent": "web:srbcodes:v1.0.0 (by /u/visionsrb)",
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch Reddit posts" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the data
    const posts = data.data.children.map((child) => {
      const post = child.data;
      return {
        id: post.id,
        title: post.title,
        subreddit: post.subreddit,
        author: post.author,
        permalink: `https://www.reddit.com${post.permalink}`,
        url: post.url,
        selftext: post.selftext || "",
        thumbnail:
          post.thumbnail &&
          post.thumbnail !== "self" &&
          post.thumbnail !== "default"
            ? post.thumbnail
            : null,
        score: post.score,
        num_comments: post.num_comments,
        created_utc: post.created_utc,
      };
    });

    return Response.json({ posts });
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    return Response.json(
      { error: "Failed to fetch Reddit posts" },
      { status: 500 }
    );
  }
}
