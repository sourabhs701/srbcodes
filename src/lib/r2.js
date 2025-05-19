import "server-only";

/**
 * Get a file from R2 as text
 * @param {import("@cloudflare/workers-types").R2Bucket} r2
 * @param {string} key
 * @returns {Promise<string|null>}
 */
export async function getFileAsText(r2, key) {
  if (!r2) {
    throw new Error(
      "R2 bucket is not available. Check wrangler.jsonc configuration."
    );
  }

  try {
    const object = await r2.get(key);
    if (!object) return null;
    return await object.text();
  } catch (error) {
    console.error(`Error getting file ${key} from R2:`, error);
    return null;
  }
}

/**
 * Upload a text file to R2
 * @param {import("@cloudflare/workers-types").R2Bucket} r2
 * @param {string} key
 * @param {string} content
 * @param {string} contentType
 * @returns {Promise<boolean>}
 */
export async function uploadTextFile(
  r2,
  key,
  content,
  contentType = "text/plain"
) {
  if (!r2) {
    throw new Error(
      "R2 bucket is not available. Check wrangler.jsonc configuration."
    );
  }

  try {
    await r2.put(key, content, {
      httpMetadata: {
        contentType,
      },
    });
    return true;
  } catch (error) {
    console.error(`Error uploading file ${key} to R2:`, error);
    return false;
  }
}

/**
 * Parse CSV content into an array of objects
 * @param {string} csvContent
 * @returns {Array<Object>}
 */
export function parseCSV(csvContent) {
  if (!csvContent) return [];

  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    return obj;
  });
}

/**
 * Get assets from a CSV file stored in R2
 * @param {import("@cloudflare/workers-types").R2Bucket} r2
 * @param {string} csvKey
 * @returns {Promise<Array<Object>>}
 */
export async function getAssetsFromCSV(r2, csvKey) {
  const csvContent = await getFileAsText(r2, csvKey);
  return csvContent ? parseCSV(csvContent) : [];
}
