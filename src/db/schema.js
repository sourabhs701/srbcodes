import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const work = sqliteTable("work", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  pageId: text("pageId").notNull(),
  github_url: text("github_url").notNull(),
  tech_stack: text("tech_stack").notNull(),
  live_url: text("live_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
