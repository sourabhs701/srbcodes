CREATE TABLE `work` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`notion_url` text NOT NULL,
	`github_url` text NOT NULL,
	`tech_stack` text NOT NULL,
	`live_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `work_slug_unique` ON `work` (`slug`);