import "server-only";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

/**
 * Get Notion page data from the Notion API
 * @param {string} pageId - Notion page ID
 * @returns {Promise<Object|null>} Notion record map or null if error
 */
export async function getNotionPageData(pageId) {
  try {
    return await notion.getPage(pageId);
  } catch (error) {
    console.error(`Error fetching Notion page (${pageId}):`, error);
    return null;
  }
}

export default notion;
