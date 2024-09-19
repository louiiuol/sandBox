import {date, pgTable, uuid, varchar} from 'drizzle-orm/pg-core';

export const NoteTable = pgTable('note', {
	id: uuid('id').primaryKey().defaultRandom().unique(),
	note: varchar('note', {length: 255}).notNull(),
	createdAt: date('createAt').defaultNow(),
});
