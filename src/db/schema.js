// src/db/schema.js
import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// Define the 'projects' table
export const projectsTable = sqliteTable(
  "projects",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description_short: text("description_short"),

    // Links
    twitter_post_link: text("twitter_post_link"),
    reddit_post_link: text("reddit_post_link"),
    details_markdown_r2_key: text("details_markdown_r2_key").notNull(),
    github_link: text("github_link"),

    // Visibility
    is_public: integer("is_public", { mode: "boolean" })
      .default(true)
      .notNull(),

    // JSON fields
    tech_stack: text("tech_stack", { mode: "json" })
      .$type()
      .default(sql`'[]'`),
    category: text("category", { mode: "json" })
      .$type()
      .default(sql`'[]'`),

    // Asset references
    assets_csv_r2_key: text("assets_csv_r2_key"),
    cover_image_url: text("cover_image_url"),
    project_url: text("project_url"),

    // Timestamps
    created_at: text("created_at")
      .$defaultFn(() => new Date().toISOString())
      .notNull(),
    updated_at: text("updated_at")
      .$defaultFn(() => new Date().toISOString())
      .notNull(),
  },
  (table) => ({
    slugIdx: index("projects_slug_idx").on(table.slug),
    isPublicIdx: index("projects_is_public_idx").on(table.is_public),
  })
);

// Define relations for the 'projects' table
export const projectsRelations = relations(projectsTable, ({}) => ({
  // No relations for now
}));
