import {
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const code = pgTable('code', {
  id: text('id').primaryKey(),
  fileName: text('fileName').notNull(),
  code: text('code').notNull(),
  description: text('description').notNull(),
  lang: text('lang').notNull(),
  authorId: text('authorId').notNull()
})